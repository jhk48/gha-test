import * as React from 'react';
import axios from 'axios';
import { checkIsMarketOpen } from '@api/stock';

interface ProviderProps {
	children: React.ReactNode;
}

type IsMarketOpenContextType = boolean | 'loading';
type IsMarketOpenUpdater = React.Dispatch<React.SetStateAction<IsMarketOpenContextType>>;

const IsMarketOpenContext = React.createContext<IsMarketOpenContextType | null>(null);
const IsMarketOpenUpdateContext = React.createContext<IsMarketOpenUpdater | null>(null);

export function IsMarketOpenContextProvider({ children }: ProviderProps) {
	const [isMarketOpen, setIsMarketOpen] = React.useState<IsMarketOpenContextType>('loading');

	React.useLayoutEffect(() => {
		const cancelSource = axios.CancelToken.source();
		let shouldCancel = false;
		(async () => {
			const initStatus = await checkIsMarketOpen(cancelSource.token);
			if (!shouldCancel) setIsMarketOpen(initStatus);
		})();

		return () => {
			cancelSource.cancel();
			shouldCancel = true;
		};
	}, []);

	return (
		<IsMarketOpenContext.Provider value={isMarketOpen}>
			<IsMarketOpenUpdateContext.Provider value={setIsMarketOpen}>
				{children}
			</IsMarketOpenUpdateContext.Provider>
		</IsMarketOpenContext.Provider>
	);
}

export function useIsMarketOpen() {
	const state = React.useContext(IsMarketOpenContext);
	if (state === null) throw new Error('Cannot find IsMarketOpenContextProvider');
	return state;
}

export function useIsMarketOpenUpdate() {
	const state = React.useContext(IsMarketOpenUpdateContext);
	if (state === null) throw new Error('Cannot find IsMarketOpenUpdateContextProvider');
	return state;
}
