import { useQuery } from 'react-query';
import { portfolioKeys } from '@lib/index';
import { getPortfolios } from '@api/portfolio';

export default function usePortfolioList() {
	return useQuery(portfolioKeys.all, getPortfolios, { staleTime: Infinity });
}
