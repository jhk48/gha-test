import { stockOverviewPageDataSubscribersRedisClient, logger } from '@lib/index';

export default async function unsubscribeStockOverviewData(userId: string) {
	try {
		await stockOverviewPageDataSubscribersRedisClient.del(userId);
	} catch (error) {
		logger.error(`unsubscribeStockOverviewData.ts: ${error}`);
	}
}
