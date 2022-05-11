import prisma from '@lib/prisma';
import { NUM_OF_STOCK_SEARCH_RESULTS_TO_TAKE } from '@constants';

export default async function getByName(nameQuery: string) {
	const tickers = await prisma.stockMeta.findMany({
		where: { name: { startsWith: nameQuery } },
		take: NUM_OF_STOCK_SEARCH_RESULTS_TO_TAKE
	});
	return tickers;
}
