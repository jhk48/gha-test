import prisma from '@lib/prisma';
import { PortfolioPrivacy } from '@prisma/client';

export default async function editPortfolioPrivacy(
	portfolioId: number,
	newPrivacy: PortfolioPrivacy
) {
	const modifiedPortfolio = await prisma.portfolio.update({
		where: { id: portfolioId },
		data: { privacy: newPrivacy }
	});
	return modifiedPortfolio;
}
