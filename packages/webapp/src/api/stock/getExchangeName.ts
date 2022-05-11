import axios from 'axios';
import envConfig from '@configs/env';

interface GetExchangeNameRes {
	data: string;
}

export default async function getExchangeName(ticker: string) {
	const { apiServerUrl } = envConfig;

	const { data }: GetExchangeNameRes = await axios.get(
		`${apiServerUrl}/stock/query/exchange?search=${ticker}`,
		{ withCredentials: true }
	);
	return data;
}
