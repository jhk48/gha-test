import prisma from '@lib/prisma';
import { StockTransactionType } from '@prisma/client';

interface AddStockTransactionArgs {
	portfolioId: number;
	ticker: string;
	price: number;
	quantity: number;
	type: StockTransactionType;
	avgBuyCost?: number;
	date: string;
}

export default async function addStockTransaction({
	portfolioId,
	ticker,
	price,
	quantity,
	type,
	avgBuyCost,
	date
}: AddStockTransactionArgs) {
	const newLog = await prisma.stockTransactionLog.create({
		data: {
			portfolioId,
			ticker,
			price,
			quantity,
			transactionType: type,
			avgBuyCost,
			createdAt: new Date(date)
		}
	});
	return newLog;
}
