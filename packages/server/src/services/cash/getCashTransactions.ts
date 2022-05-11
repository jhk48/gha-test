import prisma from '@lib/prisma';

export default async function getCashTransactions(portfolioId: number) {
	const cashTransactions = await prisma.cashTransactionLog.findMany({
		orderBy: { createdAt: 'desc' },
		where: { portfolioId }
	});
	return cashTransactions;
}
