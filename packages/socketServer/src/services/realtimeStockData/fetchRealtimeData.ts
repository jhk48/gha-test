import axios, { AxiosResponse, AxiosError } from 'axios';
import envConfig from '@config';
import { RealtimeDataFilterOptions, RealtimeDataPerTicker, StockDataFromIEX } from '@types';
import logger from '@lib/winston';

const { iexCloudBaseUrl, iexCloudApiKey } = envConfig;
const requestPath = '/stock/market/batch';

export default async function fetchRealtimeData(
	tickers: string[][]
): Promise<AxiosResponse<RealtimeDataPerTicker<StockDataFromIEX>, any>[] | null> {
	const requestFilter = filter.join(',');
	try {
		const result: AxiosResponse<RealtimeDataPerTicker<StockDataFromIEX>>[] = await Promise.all(
			tickers.map(tickerGroup => {
				const tickerParam = tickerGroup.map(ticker => encodeURIComponent(ticker)).join(',');
				return axios.get(
					`${iexCloudBaseUrl}${requestPath}?symbols=${tickerParam}&types=quote&filter=${requestFilter}&displayPercent=true&token=${iexCloudApiKey}`
				);
			})
		);

		return result;
	} catch (error) {
		const err = error as AxiosError;
		logger.error(`realtimeStockData fetchRealtimeData.ts: ${err.message}`);
		return null;
	}
}

const filter: (keyof RealtimeDataFilterOptions)[] = [
	'symbol',
	'change',
	'changePercent',
	'latestPrice',
	'open',
	'previousClose',
	'high',
	'low',
	'marketCap',
	'latestVolume',
	'week52High',
	'week52Low',
	'peRatio'
];
