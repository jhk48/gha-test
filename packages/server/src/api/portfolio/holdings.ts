import express, { NextFunction, Request, Response } from 'express';
import { StockTransactionType } from '@prisma/client';
import { sessionValidator } from '@middlewares';
import { cashService, stockTransactionService } from '@services/index';

interface PortfolioIdParam {
	portfolioId: string;
}

interface StockTransactionIdParam {
	stockTransactionId: string;
}

interface ModifyAndDeleteStockTransactionParam extends PortfolioIdParam {
	stockTransactionId: string;
}

interface TickerQuery {
	ticker: string;
}

interface GetStockTransactionOfATickerParam extends PortfolioIdParam {
	ticker: string;
}

interface AddStockTransactionReqBody {
	ticker: string;
	price: number;
	quantity: number;
	type: StockTransactionType;
	relateCash: boolean;
	avgBuyCost?: number;
	date: string;
}

interface UpdateStockTransactionPriceQuantityTypeReqBody {
	ticker: string;
	price: number;
	quantity: number;
	type: StockTransactionType;
	avgBuyCost?: number;
	date: string;
}

interface UpdateStockTransactionMemoReqBody {
	memo: string;
}

export default (): express.Router => {
	const router = express.Router();

	router.get(
		'/:portfolioId/holdings',
		sessionValidator,
		async (req: Request, res: Response, next: NextFunction) => {
			const { portfolioId } = req.params as unknown as PortfolioIdParam;

			try {
				const allStockTransactions = await stockTransactionService.getAllStockTransactions(
					Number(portfolioId)
				);

				const holdings = await stockTransactionService.calculateAvgCost(allStockTransactions);
				res.json({ holdings });
			} catch (error) {
				next(error);
			}
		}
	);

	router.get(
		'/:portfolioId/holdings/:ticker',
		sessionValidator,
		async (req: Request, res: Response, next: NextFunction) => {
			const { portfolioId, ticker } = req.params as unknown as GetStockTransactionOfATickerParam;

			try {
				const transactions = await stockTransactionService.getStockTransactionsOfATicker({
					portfolioId: Number(portfolioId),
					ticker,
					orderByDate: 'desc'
				});
				res.json(transactions);
			} catch (error) {
				next(error);
			}
		}
	);

	router.post(
		'/:portfolioId/holdings',
		sessionValidator,
		async (req: Request, res: Response, next: NextFunction) => {
			const { portfolioId } = req.params as unknown as PortfolioIdParam;
			const { ticker, price, quantity, type, relateCash, avgBuyCost, date } =
				req.body as unknown as AddStockTransactionReqBody;

			try {
				const newStockTransaction = await stockTransactionService.addStockTransaction({
					portfolioId: Number(portfolioId),
					ticker,
					price,
					quantity,
					type,
					avgBuyCost,
					date
				});

				const allStockTransactionsOfTicker =
					await stockTransactionService.getStockTransactionsOfATicker({
						portfolioId: Number(portfolioId),
						ticker,
						orderByType: 'desc'
					});

				const holdingsOfTicker = await stockTransactionService.calculateAvgCost(
					allStockTransactionsOfTicker
				);

				let newCashTransaction;
				if (relateCash) {
					const memo = `${ticker} ${quantity}주 ${type === 'buy' ? '매수' : '매도'}`;
					const stockTransactionType = type;
					newCashTransaction = await cashService.addCashTransaction({
						portfolioId: Number(portfolioId),
						amount: Number(price) * Number(quantity),
						memo,
						type: stockTransactionType === 'buy' ? 'purchased' : 'sold',
						date
					});
				}
				res.status(201).json({ newStockTransaction, newCashTransaction, holdingsOfTicker });
			} catch (error) {
				next(error);
			}
		}
	);

	router.patch(
		'/:portfolioId/holdings/:stockTransactionId',
		sessionValidator,
		async (req: Request, res: Response, next: NextFunction) => {
			const { portfolioId, stockTransactionId } =
				req.params as unknown as ModifyAndDeleteStockTransactionParam;
			const { ticker, price, quantity, type, avgBuyCost, date } =
				req.body as unknown as UpdateStockTransactionPriceQuantityTypeReqBody;

			try {
				const modifiedStockTransaction =
					await stockTransactionService.editStockTransactionPriceQuantityType({
						stockTransactionId: Number(stockTransactionId),
						price,
						quantity,
						type,
						avgBuyCost,
						date
					});
				const allStockTransactionsOfTicker =
					await stockTransactionService.getStockTransactionsOfATicker({
						portfolioId: Number(portfolioId),
						ticker,
						orderByType: 'desc'
					});
				const holdingsOfTicker = await stockTransactionService.calculateAvgCost(
					allStockTransactionsOfTicker
				);
				res.json({ modifiedStockTransaction, holdingsOfTicker });
			} catch (error) {
				next(error);
			}
		}
	);

	router.patch(
		'/holdings/:stockTransactionId/memo',
		sessionValidator,
		async (req: Request, res: Response, next: NextFunction) => {
			const { stockTransactionId } = req.params as unknown as StockTransactionIdParam;
			const { memo } = req.body as unknown as UpdateStockTransactionMemoReqBody;

			try {
				const modifiedStockTransaction = await stockTransactionService.editStockTransactionMemo(
					Number(stockTransactionId),
					memo
				);
				res.json({ result: modifiedStockTransaction });
			} catch (error) {
				next(error);
			}
		}
	);

	router.delete(
		'/:portfolioId/holdings/:stockTransactionId',
		sessionValidator,
		async (req: Request, res: Response, next: NextFunction) => {
			const { portfolioId, stockTransactionId } =
				req.params as unknown as ModifyAndDeleteStockTransactionParam;
			const { ticker } = req.query as unknown as TickerQuery;

			try {
				const deletedStockTransaction = await stockTransactionService.deleteStockTransaction(
					Number(stockTransactionId)
				);
				const allStockTransactionsOfTicker =
					await stockTransactionService.getStockTransactionsOfATicker({
						portfolioId: Number(portfolioId),
						ticker,
						orderByType: 'desc'
					});
				const holdingsOfTicker = await stockTransactionService.calculateAvgCost(
					allStockTransactionsOfTicker
				);
				res.json({ deletedStockTransaction, holdingsOfTicker });
			} catch (error) {
				next(error);
			}
		}
	);

	return router;
};
