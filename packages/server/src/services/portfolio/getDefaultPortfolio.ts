import prisma from '@lib/prisma';

export default async function getDefaultPortfolio(userId: number) {
	const portfolio = await prisma.defaultPortfolio.findFirst({
		where: { userId }
	});
	return portfolio;
}
