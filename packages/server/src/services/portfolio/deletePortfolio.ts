import prisma from '@lib/prisma';

export default async function deletePortfolio(portfolioId: number) {
	const portfolio = await prisma.portfolio.delete({
		where: { id: portfolioId }
	});
	return portfolio.id;
}
