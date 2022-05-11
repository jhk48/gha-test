import { useQueryClient, useMutation } from 'react-query';
import { editDefaultPortfolio, EditDefaultPortfolioArgs } from '@api/portfolio';
import { portfolioKeys } from '@lib/index';

export default function useEditDefaultPortfolio() {
	const queryClient = useQueryClient();

	return useMutation(
		({ prevPortfolioId, newPortfolioId }: EditDefaultPortfolioArgs) =>
			editDefaultPortfolio({ prevPortfolioId, newPortfolioId }),
		{
			onSuccess: newDefaultPortfolioId => {
				queryClient.setQueryData<number>(portfolioKeys.defaultId(), () => newDefaultPortfolioId);
			}
		}
	);
}
