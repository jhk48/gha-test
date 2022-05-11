import { topStocksDataSubscribersRedisClient, logger } from '@lib/index';

export default async function unsubscribeTopStocksData(userId: string) {
	try {
		await topStocksDataSubscribersRedisClient.del(userId);
		return true;
	} catch (error) {
		logger.error(error);
		return false;
	}
}
