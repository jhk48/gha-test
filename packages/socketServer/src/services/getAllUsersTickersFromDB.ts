import {
	realtimeStockDataSubscribersRedisClient,
	stockOverviewPageDataSubscribersRedisClient,
	realtimeStockDataRedisClient,
	logger
} from '@lib/index';

export default async function getAllUsersTickersFromDB(): Promise<string[]> {
	try {
		const realtimeStockSubscribers = await realtimeStockDataSubscribersRedisClient.keys('*');
		const stockOverviewPageSubscribers = await stockOverviewPageDataSubscribersRedisClient.keys(
			'*'
		);
		const allTickersOfRealtimeStockSubscribers = await Promise.all(
			realtimeStockSubscribers.map(subscriber =>
				realtimeStockDataSubscribersRedisClient.get(subscriber)
			)
		);

		const allTickersOfStockOverviewPageSubscribers = await Promise.all(
			stockOverviewPageSubscribers.map(subscriber =>
				stockOverviewPageDataSubscribersRedisClient.get(subscriber)
			)
		);

		const allTickersStoredInRedis = await realtimeStockDataRedisClient.keys('*');
		return [
			...new Set([
				...allTickersOfRealtimeStockSubscribers.flatMap(tickers => JSON.parse(tickers ?? '')),
				...allTickersOfStockOverviewPageSubscribers,
				...allTickersStoredInRedis
			])
		];
	} catch (error) {
		logger.error(`getAllUsersTickersFromDB.ts: ${error}`);
		return [];
	}
}
