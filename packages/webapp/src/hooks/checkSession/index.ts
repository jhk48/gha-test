import { useLayoutEffect } from 'react';
import { checkAuth } from '@api/auth';
import toast from '@lib/toast';
import { useAuthUpdate } from '@hooks/index';

interface Props {
	routePath: string;
	requireLoginMessage?: boolean;
}

export default function useCheckSession({ routePath, requireLoginMessage = false }: Props) {
	const setAuth = useAuthUpdate();

	useLayoutEffect(() => {
		async function tryLogIn() {
			const { userId, isInitialLogin } = await checkAuth();

			setAuth(!!userId);
			if (requireLoginMessage && !userId) {
				toast.error({ message: '세션이 만료되었습니다. 다시 로그인해주세요.' });
			}
			if (isInitialLogin) {
				toast.success({ message: '성공적으로 로그인 되었습니다.' });
			}
		}

		tryLogIn();
	}, [setAuth, requireLoginMessage, routePath]);
}
