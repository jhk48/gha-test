import prisma from '@lib/prisma';
import { NUM_OF_STOCK_SEARCH_RESULTS_TO_TAKE } from '@constants';

export default async function getByTicker(tickerQuery: string) {
	const tickers = await prisma.stockMeta.findMany({
		where: { ticker: { startsWith: tickerQuery } },
		take: NUM_OF_STOCK_SEARCH_RESULTS_TO_TAKE
	});
	return tickers;
}
