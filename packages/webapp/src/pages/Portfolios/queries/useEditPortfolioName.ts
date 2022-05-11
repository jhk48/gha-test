import { useQueryClient, useMutation } from 'react-query';
import { Portfolio } from '@prisma/client';
import { editPortfolioName, EditPortfolioNameArgs } from '@api/portfolio';
import { updateArray } from '@utils';
import { portfolioKeys } from '@lib/index';

export default function useEditPortfolioName() {
	const queryClient = useQueryClient();

	return useMutation(
		({ portfolioId, newPortfolioName }: EditPortfolioNameArgs) =>
			editPortfolioName({ portfolioId, newPortfolioName }),
		{
			onSuccess: updatedPortfolio => {
				queryClient.setQueryData<Portfolio[]>(portfolioKeys.all, prevPortfolios =>
					updateArray(
						prevPortfolios,
						updatedPortfolio,
						element => element.id === updatedPortfolio.id
					)
				);
			}
		}
	);
}
