import prisma from '@lib/prisma';

export default async function editDefaultPortfolio(
	prevPortfolioId: number,
	newPortfolioId: number,
	userId: number
) {
	const modifiedDefaultPortfolio = await prisma.defaultPortfolio.update({
		where: { userId_portfolioId: { userId, portfolioId: prevPortfolioId } },
		data: { portfolioId: newPortfolioId }
	});
	return modifiedDefaultPortfolio.portfolioId;
}
