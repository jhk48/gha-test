import axios from 'axios';
import envConfig from '@configs/env';
import { Portfolio } from '@prisma/client';

interface GetPortfoliosRes {
	data: {
		portfolios: Portfolio[];
	};
}

export default async function getPortfolios(): Promise<Portfolio[]> {
	const { apiServerUrl } = envConfig;

	const { data }: GetPortfoliosRes = await axios.get(`${apiServerUrl}/portfolios`, {
		withCredentials: true
	});
	return data.portfolios;
}
