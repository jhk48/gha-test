import prisma from '@lib/prisma';
import { PortfolioPrivacy } from '@prisma/client';

interface NewPortfolioArgs {
	userId: number;
	portfolioName: string;
	privacy: PortfolioPrivacy;
}

export default async function createPortfolio({
	userId,
	portfolioName,
	privacy
}: NewPortfolioArgs) {
	const newPortfolio = await prisma.portfolio.create({
		data: {
			userId,
			name: portfolioName,
			privacy
		}
	});
	return newPortfolio;
}
