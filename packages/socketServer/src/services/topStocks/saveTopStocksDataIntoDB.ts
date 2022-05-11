import { TopStocks } from '@portbullio/shared/src/types';
import { topStocksDataRedisClient } from '@lib/index';
import { topStocksCategories } from '@constants';

export default async function saveTopStocksDataIntoDB(data: TopStocks) {
	try {
		await Promise.all(
			topStocksCategories.map(cat =>
				topStocksDataRedisClient.set(cat, JSON.stringify((data as TopStocks)[cat]))
			)
		);
		return true;
	} catch (error) {
		return false;
	}
}
