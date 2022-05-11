import { realtimeStockDataRedisClient, logger } from '@lib/index';

export default async function getCachedStockOverviewData(ticker: string) {
	try {
		const result = await realtimeStockDataRedisClient.get(ticker);
		return result;
	} catch (error) {
		logger.error(`getCachedStockOverviewData.ts ${error}`);
		return null;
	}
}
