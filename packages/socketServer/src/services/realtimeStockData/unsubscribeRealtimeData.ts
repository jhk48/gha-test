import { realtimeStockDataSubscribersRedisClient, logger } from '@lib/index';

export default async function unsubscribeRealtimeData(userId: string) {
	try {
		await realtimeStockDataSubscribersRedisClient.del(userId);
		return true;
	} catch (error) {
		logger.error(error);
		return false;
	}
}
