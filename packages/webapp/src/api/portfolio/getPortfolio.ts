import axios from 'axios';
import envConfig from '@configs/env';
import { Portfolio } from '@prisma/client';

interface GetPortfolioRes {
	data: {
		portfolio: Portfolio;
	};
}

export default async function getPortfolio(portfolioId: number): Promise<Portfolio | null> {
	if (portfolioId === -1) throw new Error('Invalid portfolioId');
	const { apiServerUrl } = envConfig;

	try {
		const { data }: GetPortfolioRes = await axios.get(`${apiServerUrl}/portfolios/${portfolioId}`, {
			withCredentials: true
		});
		return data.portfolio;
	} catch (error) {
		return null;
	}
}
