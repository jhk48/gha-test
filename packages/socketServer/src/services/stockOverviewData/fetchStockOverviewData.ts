import axios, { AxiosError } from 'axios';
import envConfig from '@config';
import { RealtimeDataFilterOptions, StockDataFromIEX } from '@types';
import logger from '@lib/winston';

interface StockOverviewFetchRealtimeDataRes {
	data: Omit<StockDataFromIEX, 'symbol'>;
}

const { iexCloudBaseUrl, iexCloudApiKey } = envConfig;

export default async function fetchStockOverviewData(ticker: string) {
	const requestFilter = filter.join(',');
	try {
		const { data }: StockOverviewFetchRealtimeDataRes = await axios.get(
			`${iexCloudBaseUrl}/stock/${ticker}/quote?filter=${requestFilter}&displayPercent=true&token=${iexCloudApiKey}`
		);

		return data;
	} catch (error) {
		const err = error as AxiosError;
		logger.error(`stockOverviewData fetchStockOverviewData.ts: ${err.message}`);
		return null;
	}
}

const filter: (keyof RealtimeDataFilterOptions)[] = [
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
