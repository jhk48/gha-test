import { useQuery } from 'react-query';
import { getExchangeName } from '@api/stock';
import { stockKeys } from '@lib/index';

export default function useExchangeName(ticker: string) {
	return useQuery(stockKeys.exchangeName(ticker), () => getExchangeName(ticker), {
		staleTime: Infinity
	});
}
