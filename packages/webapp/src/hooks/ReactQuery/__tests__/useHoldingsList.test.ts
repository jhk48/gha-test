import { renderHook } from '@testing-library/react-hooks';
import { createHookQueryWrapper } from '@lib/testingLibrary/reactHook';
import useHoldingsList from '../useHoldingsList';

test('useHoldingsList test', async () => {
	const { result, waitFor } = renderHook(() => useHoldingsList(1), {
		wrapper: createHookQueryWrapper()
	});
	await waitFor(() => result.current.isSuccess);
	expect(result.current.data).toStrictEqual([
		{
			ticker: 'AAPL',
			avgCost: 123.45,
			quantity: 123
		},
		{
			ticker: 'MSFT',
			avgCost: 123.45,
			quantity: 123
		}
	]);
});
