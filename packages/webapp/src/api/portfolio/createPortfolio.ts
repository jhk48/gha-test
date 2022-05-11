import axios, { AxiosRequestConfig } from 'axios';
import { Portfolio, PortfolioPrivacy } from '@prisma/client';
import envConfig from '@configs/env';

export interface CreatePortfolioArgs {
	portfolioName: string;
	privacy: PortfolioPrivacy;
}

interface CreatePortfolioRes {
	data: {
		newPortfolio: Portfolio;
	};
}

export async function createPortfolio({ portfolioName, privacy }: CreatePortfolioArgs) {
	const { apiServerUrl } = envConfig;

	const config: AxiosRequestConfig = {
		headers: {
			'Content-Type': 'application/json'
		},
		withCredentials: true
	};

	const formData = JSON.stringify({
		portfolioName,
		privacy
	});

	const { data }: CreatePortfolioRes = await axios.post(
		`${apiServerUrl}/portfolios`,
		formData,
		config
	);
	return data.newPortfolio;
}
