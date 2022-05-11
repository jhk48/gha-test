import { stockOverviewPageDataSubscribersRedisClient } from '@lib/index';
import logger from '@lib/winston';

export default async function getTickerPerUserFromDB() {
	try {
		const userIds = await stockOverviewPageDataSubscribersRedisClient.keys('*');
		const tickersByUser = await Promise.all(
			userIds.map(userId => stockOverviewPageDataSubscribersRedisClient.get(userId))
		);
		return tickersByUser.map((ticker, idx) => ({
			userId: userIds[idx],
			ticker
		}));
	} catch (error) {
		logger.error(`getTickerPerUserFromDB.ts ${error}`);
		return [];
	}
}
