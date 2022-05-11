import { useQuery } from 'react-query';
import { useHoldingsList } from '@hooks/index';
import { getSectors } from '@api/index';
import { useSelectedPortfolioId } from '@components/index';
import { portfolioKeys } from '@lib/index';
import { getHoldingsTickers } from '@utils';

export default function useSectors() {
	const portfolioId = useSelectedPortfolioId();
	const tickers = getHoldingsTickers(useHoldingsList(portfolioId).data ?? []);
	return useQuery(portfolioKeys.sectors(portfolioId), () => getSectors(tickers), {
		staleTime: Infinity
	});
}
