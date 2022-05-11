import axios from 'axios';
import envConfig from '@configs/env';

interface GetDefaultPortfolioRes {
	data: {
		defaultPortfolioId: number;
	};
}

export default async function getDefaultPortfolio(): Promise<number | undefined> {
	const { apiServerUrl } = envConfig;
	const { data }: GetDefaultPortfolioRes = await axios.get(`${apiServerUrl}/portfolios/default`, {
		withCredentials: true
	});

	return data.defaultPortfolioId;
}
