import { useQueryClient, useMutation } from 'react-query';
import { Portfolio } from '@prisma/client';
import { editPortfolioPrivacy, EditPortfolioPrivacyArgs } from '@api/portfolio';
import { updateArray } from '@utils';
import { portfolioKeys } from '@lib/index';

export default function useEditPortfolioPrivacy() {
	const queryClient = useQueryClient();

	return useMutation(
		({ portfolioId, newPrivacy }: EditPortfolioPrivacyArgs) =>
			editPortfolioPrivacy({ portfolioId, newPrivacy }),
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
