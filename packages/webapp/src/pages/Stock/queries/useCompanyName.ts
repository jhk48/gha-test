import { useQuery } from 'react-query';
import { getCompanyName } from '@api/stock';
import { stockKeys } from '@lib/index';

export default function useCompanyName(ticker: string) {
	return useQuery(stockKeys.companyName(ticker), () => getCompanyName(ticker), {
		staleTime: Infinity
	});
}
