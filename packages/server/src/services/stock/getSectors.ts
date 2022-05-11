import prisma from '@lib/prisma';

export default async function getByTicker(tickers: string[]) {
	const sectors = await prisma.stockMeta.findMany({
		where: { ticker: { in: tickers } },
		select: { ticker: true, sector: true }
	});
	return sectors;
}
