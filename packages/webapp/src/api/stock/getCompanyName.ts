import axios from 'axios';
import envConfig from '@configs/env';

interface GetCompanyNameRes {
	data: string;
}

export default async function getCompanyName(ticker: string) {
	const { apiServerUrl } = envConfig;

	const { data }: GetCompanyNameRes = await axios.get(
		`${apiServerUrl}/stock/query/company-name?search=${ticker}`,
		{ withCredentials: true }
	);
	return data;
}
