import prisma from '@lib/prisma';

export default async function deleteStockTransaction(stockTransactionId: number) {
	const portfolio = await prisma.stockTransactionLog.delete({
		where: { id: stockTransactionId }
	});
	return portfolio;
}
