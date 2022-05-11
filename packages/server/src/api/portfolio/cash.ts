import express, { NextFunction, Request, Response } from 'express';
import * as cashService from '@services/cash';
import { sessionValidator } from '@middlewares';
import { CashTransactionType } from '@prisma/client';

interface PortfolioIdParam {
	portfolioId: string;
}

interface CashTransactionIdParam {
	cashTransactionId: number;
}

interface AddAndEditCashTransactionReqBody {
	amount: number;
	type: CashTransactionType;
	date: string;
}

interface EditCashTransactionMemoReqBody {
	memo: string;
}

export default (): express.Router => {
	const router = express.Router();

	router.get(
		'/:portfolioId/cash',
		sessionValidator,
		async (req: Request, res: Response, next: NextFunction) => {
			const { portfolioId } = req.params as unknown as PortfolioIdParam;

			try {
				const cashTransactions = await cashService.getCashTransactions(Number(portfolioId));
				res.json({ cashTransactions });
			} catch (error) {
				next(error);
			}
		}
	);

	router.post(
		'/:portfolioId/cash',
		sessionValidator,
		async (req: Request, res: Response, next: NextFunction) => {
			const { portfolioId } = req.params as unknown as PortfolioIdParam;
			const { amount, type, date } = req.body as unknown as AddAndEditCashTransactionReqBody;

			try {
				const newCashTransaction = await cashService.addCashTransaction({
					portfolioId: Number(portfolioId),
					amount,
					type,
					date
				});
				res.json({ newCashTransaction });
			} catch (error) {
				next(error);
			}
		}
	);

	router.patch(
		'/cash/:cashTransactionId',
		sessionValidator,
		async (req: Request, res: Response, next: NextFunction) => {
			const { cashTransactionId } = req.params as unknown as CashTransactionIdParam;
			const { amount, date, type } = req.body as unknown as AddAndEditCashTransactionReqBody;

			try {
				const editedCashTransaction = await cashService.editCashTransaction({
					cashTransactionId: Number(cashTransactionId),
					amount,
					type,
					date
				});

				res.json({ editedCashTransaction });
			} catch (error) {
				next(error);
			}
		}
	);

	router.patch(
		'/cash/:cashTransactionId/memo',
		sessionValidator,
		async (req: Request, res: Response, next: NextFunction) => {
			const { cashTransactionId } = req.params as unknown as CashTransactionIdParam;
			const { memo } = req.body as unknown as EditCashTransactionMemoReqBody;

			try {
				const editedCashTransaction = await cashService.editCashTransactionMemo(
					Number(cashTransactionId),
					memo
				);

				res.json({ editedCashTransaction });
			} catch (error) {
				next(error);
			}
		}
	);

	router.delete(
		'/cash/:cashTransactionId',
		sessionValidator,
		async (req: Request, res: Response, next: NextFunction) => {
			const { cashTransactionId } = req.params as unknown as CashTransactionIdParam;

			try {
				const deletedCashTransaction = await cashService.deleteCashTransaction(
					Number(cashTransactionId)
				);
				res.json({ deletedCashTransaction });
			} catch (error) {
				next(error);
			}
		}
	);

	return router;
};
