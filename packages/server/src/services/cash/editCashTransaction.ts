import prisma from '@lib/prisma';
import { CashTransactionType } from '@prisma/client';

interface EditCashTransactionArgs {
	cashTransactionId: number;
	amount: number;
	type: CashTransactionType;
	date: string;
}

export default async function editCashTransaction({
	cashTransactionId,
	amount,
	type,
	date
}: EditCashTransactionArgs) {
	const editedCashTransaction = await prisma.cashTransactionLog.update({
		where: { id: cashTransactionId },
		data: {
			amount,
			transactionType: type,
			createdAt: new Date(date)
		}
	});
	return editedCashTransaction;
}
