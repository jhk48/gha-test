import prisma from '@lib/prisma';

export default async function getAllStockTransactions(portfolioId: number) {
	const stockTransactions = await prisma.stockTransactionLog.findMany({
		orderBy: [{ ticker: 'asc' }, { transactionType: 'desc' }],
		where: {
			portfolioId
		}
	});
	return stockTransactions;
}
