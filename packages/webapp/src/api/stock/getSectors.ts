import axios from 'axios';
import envConfig from '@configs/env';
import { SectorInfo } from '@types';

interface GetSectorsRes {
	data: SectorInfo[];
}

export default async function getSectors(tickers: string[]) {
	const { apiServerUrl } = envConfig;

	if (tickers.length === 0) return [];
	try {
		const { data }: GetSectorsRes = await axios.get(
			`${apiServerUrl}/stock/query/sectors?search=${encodeURIComponent(JSON.stringify(tickers))}`,
			{ withCredentials: true }
		);
		return data;
	} catch (error) {
		return [];
	}
}
