import { renderHook } from '@testing-library/react-hooks';
import { createHookQueryWrapper } from '@lib/testingLibrary/reactHook';
import { fakeUserProfile } from '@lib/msw/mockData/user';
import useUserInfo from '../useUserProfile';

test('useUserInfo test', async () => {
	const { result, waitFor } = renderHook(() => useUserInfo(), {
		wrapper: createHookQueryWrapper()
	});
	await waitFor(() => result.current.isSuccess);
	expect(result.current.data).toStrictEqual(fakeUserProfile);
});
