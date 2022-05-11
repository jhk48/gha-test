import prisma from '@lib/prisma';

export default async function getPortfolio(portfolioId: number, userId: number) {
	const portfolio = await prisma.portfolio.findFirst({
		where: { id: portfolioId, userId }
	});
	return portfolio;
}
