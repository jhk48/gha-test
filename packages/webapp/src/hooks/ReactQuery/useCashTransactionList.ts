import { useQuery } from 'react-query';
import { getCashTransactionLogs } from '@api/cash';
import { portfolioKeys } from '@lib/index';

export default function useCashTransactionList(portfolioId: number) {
	return useQuery(portfolioKeys.cash(portfolioId), () => getCashTransactionLogs(portfolioId), {
		staleTime: Infinity
	});
}
