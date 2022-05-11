import { useQueryClient, useMutation } from 'react-query';
import { Portfolio } from '@prisma/client';
import { createPortfolio, CreatePortfolioArgs } from '@api/portfolio';
import { portfolioKeys } from '@lib/index';

export default function useCreatePortfolio() {
	const queryClient = useQueryClient();

	return useMutation(
		({ portfolioName, privacy }: CreatePortfolioArgs) =>
			createPortfolio({ portfolioName, privacy }),
		{
			onSuccess: createdPortfolio => {
				queryClient.setQueryData<Portfolio[]>(portfolioKeys.all, prevPortfolios =>
					prevPortfolios ? [...prevPortfolios, createdPortfolio] : [createdPortfolio]
				);
				queryClient.invalidateQueries(portfolioKeys.defaultId());
			}
		}
	);
}
