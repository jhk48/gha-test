import { StockTransactionLog } from '@prisma/client';

export default function calculateAvgCostForDailyRecord(stockData: StockTransactionLog[]) {
	return [...groupByTicker(stockData)].map(([ticker, tickerData]) =>
		calculateAvgCostAndQuantity(ticker, tickerData)
	);
}

function groupByTicker(stockData: StockTransactionLog[]) {
	const result = new Map<string, StockTransactionLog[]>();
	stockData.forEach(stock => {
		if (!result.has(stock.ticker)) result.set(stock.ticker, []);
		result.get(stock.ticker)?.push(stock);
	});
	return result;
}

function calculateAvgCostAndQuantity(ticker: string, stockData: StockTransactionLog[]) {
	const result = { ticker, avgCost: 0, buyQuantity: 0, sellQuantity: 0 };
	let totalCost = 0;
	let totalBuyQuantity = 0;
	let totalSellQuantity = 0;
	let numOfSellTransaction = 0;

	stockData.forEach(stock => {
		if (stock.transactionType === 'sell') {
			numOfSellTransaction += stock.quantity;
			totalSellQuantity += stock.quantity;
			return;
		}

		totalBuyQuantity += stock.quantity;
		const buyQuantity = stock.quantity - numOfSellTransaction;
		if (buyQuantity > 0) {
			totalCost += stock.price * buyQuantity;
			numOfSellTransaction = 0;
			return;
		}

		if (buyQuantity < 0) {
			numOfSellTransaction = -buyQuantity;
			return;
		}

		numOfSellTransaction = 0;
	});

	result.avgCost =
		totalBuyQuantity - totalSellQuantity > 0
			? totalCost / (totalBuyQuantity - totalSellQuantity)
			: 0;
	result.buyQuantity = totalBuyQuantity;
	result.sellQuantity = totalSellQuantity;
	return result;
}
