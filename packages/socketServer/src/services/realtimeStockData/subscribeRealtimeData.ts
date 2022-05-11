import { realtimeStockDataSubscribersRedisClient, logger } from '@lib/index';

export default async function subscribeRealtimeData(userId: string, tickers: string[]) {
	try {
		await realtimeStockDataSubscribersRedisClient.set(userId, JSON.stringify(tickers));
		return true;
	} catch (error) {
		logger.error(error);
		return false;
	}
}
