import axios from 'axios';
import envConfig from '@configs/env';
import { Holding } from '@portbullio/shared/src/types';

interface GetAllHoldingsRes {
	data: {
		holdings: Holding[];
	};
}

export default async function getAllHoldings(portfolioId: number): Promise<Holding[]> {
	if (portfolioId === -1) return [];
	const { apiServerUrl } = envConfig;

	const { data }: GetAllHoldingsRes = await axios.get(
		`${apiServerUrl}/portfolios/${portfolioId}/holdings`,
		{
			withCredentials: true
		}
	);
	return data.holdings;
}
