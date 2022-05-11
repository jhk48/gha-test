import axios, { AxiosRequestConfig } from 'axios';
import envConfig from '@configs/env';

export interface EditDefaultPortfolioArgs {
	prevPortfolioId: number;
	newPortfolioId: number;
}

interface EditDefaultPortfolioRes {
	data: {
		modifiedId: number;
	};
}

export async function editDefaultPortfolio({
	newPortfolioId,
	prevPortfolioId
}: EditDefaultPortfolioArgs) {
	const { apiServerUrl } = envConfig;

	const config: AxiosRequestConfig = {
		headers: {
			'Content-Type': 'application/json'
		},
		withCredentials: true
	};

	const formData = JSON.stringify({ prevPortfolioId, newPortfolioId });
	const { data }: EditDefaultPortfolioRes = await axios.put(
		`${apiServerUrl}/portfolios/default`,
		formData,
		config
	);
	return data.modifiedId;
}
