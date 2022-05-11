import { useQuery, useQueryClient } from 'react-query';
import { Holding } from '@portbullio/shared/src/types';
import { portfolioKeys } from '@lib/index';
import { getAllHoldings, getSectors } from '@api/index';

export default function useHoldingsList(portfolioId: number) {
	const queryClient = useQueryClient();

	return useQuery(portfolioKeys.holdings(portfolioId), () => getAllHoldings(portfolioId), {
		staleTime: portfolioId === -1 ? 0 : Infinity,
		refetchOnWindowFocus: false,
		onSuccess: async (holdingsList: Holding[]) => {
			const tickers = holdingsList.map(({ ticker }) => ticker);
			const sectors = await getSectors(tickers);
			queryClient.setQueryData(portfolioKeys.sectors(portfolioId), sectors);
		}
	});
}
