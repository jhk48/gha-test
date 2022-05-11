import { useQueryClient, useMutation } from 'react-query';
import { StockTransactionLog } from '@prisma/client';
import { Holding } from '@portbullio/shared/src/types';
import { deleteStockTransaction, DeleteStockTransactionArgs } from '@api/holdings';
import { portfolioKeys } from '@lib/index';
import { updateArray, sortByString } from '@utils';

export default function useDeleteStockTransaction() {
	const queryClient = useQueryClient();

	return useMutation(
		({ portfolioId, stockTransactionId, ticker }: DeleteStockTransactionArgs) =>
			deleteStockTransaction({ portfolioId, stockTransactionId, ticker }),
		{
			onSuccess: ({ holdingsOfTicker, deletedStockTransaction }, { portfolioId, ticker }) => {
				queryClient.setQueryData<StockTransactionLog[]>(
					portfolioKeys.stockTransactionLogs(portfolioId, ticker),
					prevStockTransactions =>
						prevStockTransactions?.filter(({ id }) => id !== deletedStockTransaction.id) ?? []
				);

				if (holdingsOfTicker.length === 0) {
					queryClient.setQueryData<Holding[]>(
						portfolioKeys.holdings(portfolioId),
						prevHoldingsOfTicker => prevHoldingsOfTicker?.filter(el => el.ticker !== ticker) ?? []
					);
					queryClient.invalidateQueries(portfolioKeys.sectors(portfolioId));
				} else {
					queryClient.setQueryData<Holding[]>(
						portfolioKeys.holdings(portfolioId),
						prevHoldingsOfTicker =>
							updateArray(
								prevHoldingsOfTicker,
								holdingsOfTicker[0],
								el => el.ticker === holdingsOfTicker[0].ticker
							).sort((a, b) => sortByString(a.ticker, b.ticker))
					);
				}
			}
		}
	);
}
