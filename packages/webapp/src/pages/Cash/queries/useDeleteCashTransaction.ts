import { useQueryClient, useMutation } from 'react-query';
import { CashTransactionLog } from '@prisma/client';
import { deleteCashTransaction } from '@api/cash';
import { portfolioKeys } from '@lib/index';
import { sortByDate } from '@utils';

export default function useDeleteStockTransaction(portfolioId: number) {
	const queryClient = useQueryClient();

	return useMutation((cashTransactionId: number) => deleteCashTransaction(cashTransactionId), {
		onSuccess: deletedCashTransaction => {
			queryClient.setQueryData<CashTransactionLog[]>(
				portfolioKeys.cash(portfolioId),
				prevCashTransactions =>
					prevCashTransactions
						? prevCashTransactions
								.filter(el => el.id !== deletedCashTransaction.id)
								.sort((a, b) => sortByDate(a.createdAt, b.createdAt, 'desc'))
						: []
			);
		}
	});
}
