import { stockOverviewPageDataSubscribersRedisClient, logger } from '@lib/index';

export default async function subscribeStockOverviewData(userId: string, ticker: string) {
	try {
		await stockOverviewPageDataSubscribersRedisClient.set(userId, ticker);
		return true;
	} catch (error) {
		logger.error(`subscribeStockOverviewData.ts: ${error}`);
		return false;
	}
}
