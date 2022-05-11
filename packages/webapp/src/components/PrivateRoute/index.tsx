import { ReactElement } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import useCheckSession from '@hooks/checkSession';

interface Props {
	isAllowed: boolean;
	fallbackUrl?: string;
	children?: ReactElement;
}

export default function PrivateRoute({
	isAllowed,
	fallbackUrl = '/',
	children
}: Props): ReactElement {
	const location = useLocation();
	useCheckSession({ requireLoginMessage: true, routePath: location.pathname });

	if (!isAllowed) {
		return <Navigate to={fallbackUrl} replace />;
	}

	return children ?? <Outlet />;
}
