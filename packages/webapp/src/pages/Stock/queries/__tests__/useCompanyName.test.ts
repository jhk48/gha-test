import { renderHook } from '@testing-library/react-hooks';
import { createHookQueryWrapper } from '@lib/testingLibrary/reactHook';
import useCompanyName from '../useCompanyName';

test(`useCompanyName test case1: search query='AAPL'`, async () => {
	const { result, waitFor } = renderHook(() => useCompanyName('AAPL'), {
		wrapper: createHookQueryWrapper()
	});
	await waitFor(() => result.current.isSuccess);
	expect(result.current.data).toBe('Apple Inc');
});

test(`useCompanyName test case2: search query='TSLA'`, async () => {
	const { result, waitFor } = renderHook(() => useCompanyName('TSLA'), {
		wrapper: createHookQueryWrapper()
	});
	await waitFor(() => result.current.isSuccess);
	expect(result.current.data).toBe('Tesla Inc');
});

test(`useCompanyName test case3: invalid ticker`, async () => {
	const { result, waitFor } = renderHook(() => useCompanyName('AAPL123'), {
		wrapper: createHookQueryWrapper()
	});
	await waitFor(() => result.current.isSuccess);
	expect(result.current.data).toStrictEqual({ message: 'Cannot find company name' });
});
