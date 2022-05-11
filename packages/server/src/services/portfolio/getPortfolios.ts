import prisma from '@lib/prisma';

export default async function getPortfolios(userId: number) {
	const portfolios = await prisma.portfolio.findMany({
		where: { userId }
	});
	return portfolios;
}
