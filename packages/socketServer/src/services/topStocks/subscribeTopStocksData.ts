import { TopStockCategory } from '@portbullio/shared/src/types';
import { topStocksDataSubscribersRedisClient, logger } from '@lib/index';

export default async function subscribeTopStocksData(userId: string, category: TopStockCategory) {
	try {
		await topStocksDataSubscribersRedisClient.set(userId, JSON.stringify(category));
		return true;
	} catch (error) {
		logger.error(error);
		return false;
	}
}
