import { RealtimeData, ClientStockRealtimeData } from '@portbullio/shared/src/types';

export default function formatEmitRealtimeData(
	realtimeData: RealtimeData[]
): ClientStockRealtimeData {
	const result = new Map();
	realtimeData.forEach(({ ticker, ...data }) => result.set(ticker, data));
	return Object.fromEntries(result);
}
