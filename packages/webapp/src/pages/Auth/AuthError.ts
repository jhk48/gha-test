import toast from '@lib/toast';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function AuthError() {
	const navigate = useNavigate();
	const [queryParams] = useSearchParams();
	const prevPath = queryParams.get('path');

	useEffect(() => {
		if (!prevPath) {
			navigate('/', { replace: true });
		} else {
			toast.error({ message: '로그인에 실패했습니다. 다시 시도해 주세요.' });
			navigate(prevPath, { replace: true });
		}
	}, [navigate, prevPath]);

	return null;
}
