import { useMutation, useQueryClient } from 'react-query';
import { editStockTransactionMemo, EditStockTransactionMemoArgs } from '@api/holdings';
import { StockTransactionLog } from '@prisma/client';
import { updateArray } from '@utils';
import { portfolioKeys } from '@lib/index';

export default function useEditStockTransactionMemo(portfolioId: number, ticker: string) {
	const queryClient = useQueryClient();

	return useMutation(
		({ stockTransactionId, newMemo }: EditStockTransactionMemoArgs) =>
			editStockTransactionMemo({ stockTransactionId, newMemo }),
		{
			onSuccess: updatedTransaction => {
				queryClient.setQueryData<StockTransactionLog[]>(
					portfolioKeys.stockTransactionLogs(portfolioId, ticker),
					prevStockTransactions =>
						updateArray(
							prevStockTransactions,
							updatedTransaction,
							element => element.id === updatedTransaction.id
						)
				);
			}
		}
	);
}
