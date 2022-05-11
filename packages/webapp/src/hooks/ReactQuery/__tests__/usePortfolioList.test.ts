import { renderHook } from '@testing-library/react-hooks';
import { createHookQueryWrapper } from '@lib/testingLibrary/reactHook';
import usePortfolioList from '../usePortfolioList';

test('usePortfolioList test', async () => {
	const { result, waitFor } = renderHook(() => usePortfolioList(), {
		wrapper: createHookQueryWrapper()
	});
	await waitFor(() => result.current.isSuccess);
	expect(result.current.data).toStrictEqual([
		{
			id: 1,
			userId: 1,
			name: '포트폴리오 1',
			privacy: 'public',
			createdAt: '2022-03-07T12:37:15.000Z'
		},
		{
			id: 2,
			userId: 2,
			name: '포트폴리오 2',
			privacy: 'private',
			createdAt: '2022-03-08T00:26:00.000Z'
		}
	]);
});
