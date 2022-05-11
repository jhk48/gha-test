import { renderHook } from '@testing-library/react-hooks';
import { createHookQueryWrapper } from '@lib/testingLibrary/reactHook';
import useAvatarUrl from '../useAvatarUrl';

test('useAvatarUrl test', async () => {
	const { result, waitFor } = renderHook(() => useAvatarUrl(), {
		wrapper: createHookQueryWrapper()
	});
	await waitFor(() => result.current.isSuccess);
	expect(result.current.data).toBe('test-image.png');
});
