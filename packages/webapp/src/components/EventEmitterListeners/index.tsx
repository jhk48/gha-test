import { ReactNode, useLayoutEffect } from 'react';
import { useEmitter, useAuthUpdate } from '@hooks/index';

interface Props {
	children: ReactNode;
}

export default function EventEmitterListeners({ children }: Props) {
	const setAuth = useAuthUpdate();
	const Emitter = useEmitter();

	useLayoutEffect(() => {
		function handleSetAuthToFalse() {
			setAuth(false);
		}
		Emitter.on('LOG_OUT', handleSetAuthToFalse);

		return () => {
			Emitter.removeListener('LOG_OUT', handleSetAuthToFalse);
		};
	}, [Emitter, setAuth]);

	return <>{children}</>;
}
