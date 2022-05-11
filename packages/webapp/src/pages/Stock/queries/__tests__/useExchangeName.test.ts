import { renderHook } from '@testing-library/react-hooks';
import { createHookQueryWrapper } from '@lib/testingLibrary/reactHook';
import useExchangeName from '../useExchangeName';

test(`useExchangeName test case1: search query='AAPL'`, async () => {
	const { result, waitFor } = renderHook(() => useExchangeName('AAPL'), {
		wrapper: createHookQueryWrapper()
	});
	await waitFor(() => result.current.isSuccess);
	expect(result.current.data).toBe('Nasdaq');
});

test(`useExchangeName test case2: search query='BA'`, async () => {
	const { result, waitFor } = renderHook(() => useExchangeName('BA'), {
		wrapper: createHookQueryWrapper()
	});
	await waitFor(() => result.current.isSuccess);
	expect(result.current.data).toBe('NYSE');
});

test(`useExchangeName test case3: search query='AAMC'`, async () => {
	const { result, waitFor } = renderHook(() => useExchangeName('AAMC'), {
		wrapper: createHookQueryWrapper()
	});
	await waitFor(() => result.current.isSuccess);
	expect(result.current.data).toBe('AMEX');
});

test(`useExchangeName test case4: search query='AAAU'`, async () => {
	const { result, waitFor } = renderHook(() => useExchangeName('AAAU'), {
		wrapper: createHookQueryWrapper()
	});
	await waitFor(() => result.current.isSuccess);
	expect(result.current.data).toBe('BATS');
});

test(`useExchangeName test case5: search query='AAAU'`, async () => {
	const { result, waitFor } = renderHook(() => useExchangeName('AAA'), {
		wrapper: createHookQueryWrapper()
	});
	await waitFor(() => result.current.isSuccess);
	expect(result.current.data).toBe('NYSEArca');
});

test(`useExchangeName test case6: search query='FOTXY'`, async () => {
	const { result, waitFor } = renderHook(() => useExchangeName('FOTXY'), {
		wrapper: createHookQueryWrapper()
	});
	await waitFor(() => result.current.isSuccess);
	expect(result.current.data).toBe('OTC');
});

test(`useExchangeName test case7: invalid ticker`, async () => {
	const { result, waitFor } = renderHook(() => useExchangeName('AAPL123'), {
		wrapper: createHookQueryWrapper()
	});
	await waitFor(() => result.current.isSuccess);
	expect(result.current.data).toStrictEqual({ message: 'Cannot find exchange name' });
});
