import prisma from '@lib/prisma';

export default async function editPortfolioName(portfolioId: number, newName: string) {
	const modifiedPortfolio = await prisma.portfolio.update({
		where: { id: portfolioId },
		data: { name: newName }
	});
	return modifiedPortfolio;
}
