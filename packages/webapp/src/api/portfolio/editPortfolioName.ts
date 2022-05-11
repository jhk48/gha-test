import axios, { AxiosRequestConfig } from 'axios';
import { Portfolio } from '@prisma/client';
import envConfig from '@configs/env';

export interface EditPortfolioNameArgs {
	portfolioId: number;
	newPortfolioName: string;
}

interface EditPortfolioNameRes {
	data: {
		modifiedPortfolio: Portfolio;
	};
}

export async function editPortfolioName({ portfolioId, newPortfolioName }: EditPortfolioNameArgs) {
	if (portfolioId === -1) throw new Error('Invalid portfolioId');
	const { apiServerUrl } = envConfig;

	const config: AxiosRequestConfig = {
		headers: {
			'Content-Type': 'application/json'
		},
		withCredentials: true
	};

	const formData = JSON.stringify({ newPortfolioName });
	const { data }: EditPortfolioNameRes = await axios.patch(
		`${apiServerUrl}/portfolios/${portfolioId}/name`,
		formData,
		config
	);
	return data.modifiedPortfolio;
}
