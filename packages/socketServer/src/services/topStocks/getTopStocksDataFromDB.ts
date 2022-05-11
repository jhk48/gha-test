import { TopStockData, TopStocks, TopStockCategory } from '@portbullio/shared/src/types';
import { topStocksCategories } from '@constants';
import { topStocksDataRedisClient } from '@lib/index';
import transformTopStocksRawData from './transformTopStocksRawData';

export default async function getTopStocksDataFromDB(
	category: TopStockCategory
): Promise<TopStocks | TopStockData[] | null> {
	try {
		if (category === 'all') {
			const topStocksRawData = await Promise.all(
				topStocksCategories.map(cat => topStocksDataRedisClient.get(cat))
			);

			if (topStocksRawData.some(data => data === null)) return null;
			const topStocksData = transformTopStocksRawData(
				topStocksRawData.map(data => JSON.parse(data ?? ''))
			);
			return topStocksData;
		}

		const topStocksData = await topStocksDataRedisClient.get(category);
		if (!topStocksData) return null;
		return JSON.parse(topStocksData);
	} catch (error) {
		return null;
	}
}
