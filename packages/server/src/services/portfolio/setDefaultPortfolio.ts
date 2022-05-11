import prisma from '@lib/prisma';

export default async function setDefaultPortfolio(portfolioId: number, userId: number) {
	await prisma.defaultPortfolio.create({
		data: {
			portfolioId,
			userId
		}
	});
	return portfolioId;
}
