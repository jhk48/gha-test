import prisma from '@lib/prisma';

export default async function deleteCashTransaction(cashTransactionId: number) {
	const deletedCashTransaction = await prisma.cashTransactionLog.delete({
		where: { id: cashTransactionId }
	});
	return deletedCashTransaction;
}
