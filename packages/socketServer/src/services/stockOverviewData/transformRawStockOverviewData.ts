import { RealtimeDataProperties } from '@portbullio/shared/src/types';
import { StockDataFromIEX } from '@types';

export default function transformRawStockOverviewData(
	rawData: Omit<StockDataFromIEX, 'symbol'> | null
): RealtimeDataProperties | null {
	if (!rawData) return null;

	return helper(rawData);
}

function helper({
	latestPrice,
	previousClose,
	latestVolume,
	...rest
}: Omit<StockDataFromIEX, 'symbol'>) {
	return {
		price: latestPrice,
		prevClose: previousClose,
		volume: latestVolume,
		...rest
	};
}
