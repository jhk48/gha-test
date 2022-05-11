import prisma from '@lib/prisma';
import { CashTransactionType } from '@prisma/client';

interface AddCashTransactionArgs {
	portfolioId: number;
	amount: number;
	type: CashTransactionType;
	memo?: string;
	date: string;
}

export default async function addCashTransaction({
	portfolioId,
	amount,
	type,
	memo = '',
	date
}: AddCashTransactionArgs) {
	const newLog = await prisma.cashTransactionLog.create({
		data: {
			portfolioId,
			amount,
			transactionType: type,
			memo,
			createdAt: new Date(date)
		}
	});
	return newLog;
}
