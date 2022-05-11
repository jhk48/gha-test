import prisma from '@lib/prisma';

export default async function editCashTransactionMemo(cashTransactionId: number, memo: string) {
	const editedCashTransaction = await prisma.cashTransactionLog.update({
		where: { id: cashTransactionId },
		data: { memo }
	});
	return editedCashTransaction;
}
