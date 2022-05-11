import { realtimeStockDataRedisClient } from '@lib/index';
import { RealtimeData } from '@portbullio/shared/src/types';

export default async function getRealtimeDataFromDB(tickers: string[]): Promise<RealtimeData[]> {
	try {
		const realtimeDataPerTicker = await Promise.all(
			tickers.map(ticker => realtimeStockDataRedisClient.get(ticker))
		);

		return realtimeDataPerTicker.map((data, idx) => ({
			ticker: tickers[idx],
			...JSON.parse(data ?? '')
		}));
	} catch (error) {
		return [];
	}
}
