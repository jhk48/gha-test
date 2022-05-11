import { AxiosResponse } from 'axios';
import { RealtimeData } from '@portbullio/shared/src/types';
import { RealtimeDataPerTicker, StockDataFromIEX } from '@types';

export default function transformRawStockData(
	rawData: AxiosResponse<RealtimeDataPerTicker<StockDataFromIEX>, any>[] | null
): RealtimeData[] | null {
	if (!rawData) return null;

	return rawData.flatMap(({ data }) =>
		Object.keys(data).map(ticker => ({
			ticker: data[ticker].quote.symbol,
			change: data[ticker].quote.change,
			changePercent: data[ticker].quote.changePercent,
			price: data[ticker].quote.latestPrice,
			open: data[ticker].quote.open,
			prevClose: data[ticker].quote.previousClose,
			high: data[ticker].quote.high,
			low: data[ticker].quote.low,
			marketCap: data[ticker].quote.marketCap,
			volume: data[ticker].quote.latestVolume,
			week52High: data[ticker].quote.week52High,
			week52Low: data[ticker].quote.week52Low,
			peRatio: data[ticker].quote.peRatio
		}))
	);
}
