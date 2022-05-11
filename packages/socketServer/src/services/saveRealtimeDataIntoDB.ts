import { RealtimeData } from '@portbullio/shared/src/types';
import { realtimeStockDataRedisClient, logger } from '@lib/index';

export default async function saveRealtimeDataIntoDB(realtimeData: RealtimeData[]) {
	try {
		await Promise.all(
			realtimeData.map(({ ticker, ...data }) =>
				realtimeStockDataRedisClient.set(ticker, JSON.stringify(data))
			)
		);
		return true;
	} catch (error) {
		logger.error(`saveRealtimeDataIntoDB.ts ${error}`);
		return false;
	}
}
