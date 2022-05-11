import { renderHook } from '@testing-library/react-hooks';
import { createHookQueryWrapper } from '@lib/testingLibrary/reactHook';
import { useStockTransactionLogs } from '../queries';

test('useStockTransactionLogs test', async () => {
	const { result, waitFor } = renderHook(() => useStockTransactionLogs(1, 'AAPL'), {
		wrapper: createHookQueryWrapper()
	});
	await waitFor(() => result.current.isSuccess);
	expect(result.current.data).toStrictEqual([
		{
			id: 1,
			portfolioId: 1,
			ticker: 'AAPL',
			price: 132.14,
			quantity: 1,
			memo: null,
			transactionType: 'buy',
			avgBuyCost: null,
			createdAt: '2022-03-24T04:54:39.000Z'
		},
		{
			id: 2,
			portfolioId: 1,
			ticker: 'AAPL',
			price: 123.45,
			quantity: 1,
			memo: 'abc',
			transactionType: 'sell',
			avgBuyCost: 94.0141891891892,
			createdAt: '2022-03-24T04:33:41.000Z'
		}
	]);
});
