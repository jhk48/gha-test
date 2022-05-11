import { realtimeStockDataSubscribersRedisClient } from '@lib/index';

export default async function getTickersPerUserFromDB() {
	try {
		const userIds = await realtimeStockDataSubscribersRedisClient.keys('*');
		const tickersByUser = await Promise.all(
			userIds.map(userId => realtimeStockDataSubscribersRedisClient.get(userId))
		);
		return tickersByUser.map((tckers, idx) => ({
			userId: userIds[idx],
			tickers: JSON.parse(tckers ?? '')
		}));
	} catch (error) {
		return [];
	}
}
