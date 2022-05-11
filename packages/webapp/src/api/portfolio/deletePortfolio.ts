import axios from 'axios';
import envConfig from '@configs/env';

export interface DeletePortfolioArgs {
	portfolioId: number;
	isDefaultPortfolio: boolean;
}

interface DeletePortfolioRes {
	data: {
		deletedId: number;
	};
}

export async function deletePortfolio({ portfolioId, isDefaultPortfolio }: DeletePortfolioArgs) {
	if (portfolioId === -1) throw new Error('Invalid portfolioId');
	const { apiServerUrl } = envConfig;

	const { data }: DeletePortfolioRes = await axios.delete(
		`${apiServerUrl}/portfolios/${portfolioId}?isDefaultPortfolio=${
			isDefaultPortfolio ? '1' : '0'
		}`,
		{ withCredentials: true }
	);
	return data.deletedId;
}
