import prisma from '@lib/prisma';
import { StockTransactionType } from '@prisma/client';

interface UpdateStockTransactionArgs {
	stockTransactionId: number;
	price: number;
	quantity: number;
	type: StockTransactionType;
	avgBuyCost?: number | null;
	date: string;
}

export default async function editStockTransactionPriceQuantityType({
	stockTransactionId,
	price,
	quantity,
	type,
	avgBuyCost = null,
	date
}: UpdateStockTransactionArgs) {
	const modifiedStockTransaction = await prisma.stockTransactionLog.update({
		where: { id: stockTransactionId },
		data: {
			price,
			quantity,
			transactionType: type,
			avgBuyCost,
			createdAt: new Date(date)
		}
	});
	return modifiedStockTransaction;
}
