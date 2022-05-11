import axios, { AxiosError } from 'axios';
import envConfig from '@config';
import { TopStockData, TopStocks, TopStockCategory } from '@portbullio/shared/src/types';
import { topStocksCategories } from '@constants';
import { FMPTopStockData } from '@types';
import logger from '@lib/winston';
import transformTopStocksRawData from './transformTopStocksRawData';

interface TopStocksRes {
	data: FMPTopStockData[];
}

export default async function fetchTopStocks(
	category: TopStockCategory
): Promise<TopStocks | TopStockData[] | null> {
	if (category === 'all') {
		const topStocksRawData = await Promise.all(topStocksCategories.map(cat => fetchHelper(cat)));
		if (topStocksRawData.some(data => data.length === 0)) return null;
		const topStocksData = transformTopStocksRawData(topStocksRawData);
		return topStocksData;
	}

	const result = await fetchHelper(category);
	return result.length > 0 ? result : null;
}

async function fetchHelper(category: TopStockCategory): Promise<TopStockData[]> {
	try {
		const { data }: TopStocksRes = await axios.get(
			`https://financialmodelingprep.com/api/v3/stock_market/${category}?apikey=${envConfig.fmpApiKey}`
		);

		return data.map(({ symbol, price, change, changesPercentage }) => ({
			ticker: symbol,
			price,
			change,
			changePercent: changesPercentage
		}));
	} catch (error) {
		const err = error as AxiosError;
		logger.error(`fetchTopStocks.ts: ${err.message}`);
		return [];
	}
}
