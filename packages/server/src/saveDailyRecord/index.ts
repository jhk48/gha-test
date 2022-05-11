import prisma from '@lib/prisma';
import logger from '@lib/winston';
import { marketStatusRedisClient } from '@lib/index';
import { cashService, stockService, stockTransactionService } from '@services/index';
import calculateAvgCostForDailyRecord from './calculateAvgCostForDailyRecord';
import calcTotalCahAmount from './calcTotalCashAmount';
import fetchStockPriceData from './fetchStockPriceData';
import saveDailyDataIntoDB from './saveDailyDataIntoDB';

async function main() {
	marketStatusRedisClient.connect();
	if (!(await stockService.getMarketStatus())) {
		logger.info(`It's Stock Market holiday today. Exit...`);
		marketStatusRedisClient.disconnect();
		return;
	}

	logger.info('Start Saving Daily Record...');
	await new Promise(resolve => {
		setTimeout(resolve, 1000 * 60 * 2);
	});

	try {
		const portfolioIdsPerUser = new Map<number, number[]>();
		const userAndPortfolioIds = await prisma.portfolio.findMany({
			select: {
				id: true,
				userId: true
			}
		});

		userAndPortfolioIds.forEach(({ id, userId }) => {
			if (!portfolioIdsPerUser.has(userId)) portfolioIdsPerUser.set(userId, []);
			portfolioIdsPerUser.get(userId)?.push(id);
		});

		const stockTransactionDataPerPortfolioPerUser = await Promise.all(
			[...portfolioIdsPerUser.keys()].map(userId =>
				Promise.all(
					portfolioIdsPerUser
						?.get(userId)
						?.map(portfolioId => stockTransactionService.getAllStockTransactions(portfolioId)) ?? []
				)
			)
		);

		const avgCostDataPerPortfolioPerUser = stockTransactionDataPerPortfolioPerUser.map(portfolios =>
			portfolios.map(stockTransaction => calculateAvgCostForDailyRecord(stockTransaction))
		);

		const cashTransactionDataPerPortfolioPerUser = await Promise.all(
			[...portfolioIdsPerUser.keys()].map(userId =>
				Promise.all(
					portfolioIdsPerUser
						?.get(userId)
						?.map(portfolioId => cashService.getCashTransactions(portfolioId)) ?? []
				)
			)
		);

		const totalCashAmountPerPortfolioPerUser = cashTransactionDataPerPortfolioPerUser.map(
			portfolios => portfolios.map(cashTransaction => calcTotalCahAmount(cashTransaction))
		);

		const tickers = new Set(
			avgCostDataPerPortfolioPerUser.flatMap(portfolios =>
				portfolios.flatMap(avgCostData => avgCostData.map(({ ticker }) => ticker))
			)
		);

		const stockPriceData = await fetchStockPriceData([...tickers]);

		const totalValuationDataPerPortfolioPerUser = avgCostDataPerPortfolioPerUser.map(portfolios =>
			portfolios.map(avgCostData =>
				avgCostData.reduce(
					(acc, { ticker, buyQuantity, sellQuantity }) => {
						const tickerData = stockPriceData[ticker];
						const holdingQuantity = buyQuantity - sellQuantity;

						return {
							totalAsset: acc.totalAsset + (tickerData.price ?? 0) * holdingQuantity,
							totalDailyReturn: acc.totalDailyReturn + (tickerData.change ?? 0) * holdingQuantity
						};
					},
					{ totalAsset: 0, totalDailyReturn: 0 }
				)
			)
		);

		await Promise.all(
			[...portfolioIdsPerUser]
				.map(([userId, portfolioIds], userIdx) =>
					portfolioIds.map((portfolioId, portfolioIdx) => ({
						userId,
						portfolioId,
						totalAsset:
							totalValuationDataPerPortfolioPerUser[userIdx][portfolioIdx].totalAsset +
							totalCashAmountPerPortfolioPerUser[userIdx][portfolioIdx],
						dailyReturn:
							totalValuationDataPerPortfolioPerUser[userIdx][portfolioIdx].totalDailyReturn
					}))
				)
				.map(dailyValuationDataPerUser => dailyValuationDataPerUser.map(saveDailyDataIntoDB))
		);
		logger.info('Finished Saving Daily Record...');
		marketStatusRedisClient.disconnect();
	} catch (error) {
		logger.error(error);
	}
}

main();
