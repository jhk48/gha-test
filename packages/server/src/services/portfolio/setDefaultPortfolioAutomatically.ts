import prisma from '@lib/prisma';
import getPortfolios from './getPortfolios';
import deleteDefaultPortfolio from './deleteDefaultPortfolio';

export default async function setDefaultPortfolioAutomatically(
	prevPortfolioId: number,
	userId: number
) {
	const portfolios = await getPortfolios(userId);
	if (portfolios.length < 2) {
		await deleteDefaultPortfolio(prevPortfolioId, userId);
		return;
	}
	const newPortfolioIdCandidate = portfolios[0].id;
	const newPortfolioId =
		newPortfolioIdCandidate === prevPortfolioId ? portfolios[1].id : newPortfolioIdCandidate;

	await prisma.defaultPortfolio.update({
		where: { userId_portfolioId: { userId, portfolioId: prevPortfolioId } },
		data: { portfolioId: newPortfolioId }
	});
}
