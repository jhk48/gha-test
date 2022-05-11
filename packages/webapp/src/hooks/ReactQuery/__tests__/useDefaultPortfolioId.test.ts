import { renderHook } from '@testing-library/react-hooks';
import { createHookQueryWrapper } from '@lib/testingLibrary/reactHook';
import useDefaultPortfolioId from '../useDefaultPortfolioId';

test('useDefaultPortfolioId test', async () => {
	const { result, waitFor } = renderHook(() => useDefaultPortfolioId(), {
		wrapper: createHookQueryWrapper()
	});
	await waitFor(() => result.current.isSuccess);
	expect(result.current.data).toBe(1);
});
