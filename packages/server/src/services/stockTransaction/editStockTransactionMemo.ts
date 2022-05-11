import prisma from '@lib/prisma';

export default async function editStockTransactionMemo(stockTransactionId: number, memo: string) {
	const modifiedStockTransaction = await prisma.stockTransactionLog.update({
		where: { id: stockTransactionId },
		data: { memo }
	});
	return modifiedStockTransaction;
}
