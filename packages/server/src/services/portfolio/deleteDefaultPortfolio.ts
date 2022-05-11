import prisma from '@lib/prisma';

export default async function deleteDefaultPortfolio(portfolioId: number, userId: number) {
	const portfolio = await prisma.defaultPortfolio.delete({
		where: { userId_portfolioId: { userId, portfolioId } }
	});
	return portfolio;
}
