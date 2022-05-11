import * as React from 'react';
import { useDefaultPortfolioId } from '@hooks/ReactQuery';

type PortfolioIdUpdateFn = (e: React.SyntheticEvent) => void;

interface ProviderProps {
	children: React.ReactNode;
}

const PortfolioIdContext = React.createContext<number>(-1);
const PortfolioIdUpdateContext = React.createContext<PortfolioIdUpdateFn | null>(null);

export function SelectedPortfolioIdContextProvider({ children }: ProviderProps) {
	const defaultPortfolioId = useDefaultPortfolioId(false);
	const [selectedPortfolioId, setSelectedPortfolioId] = React.useState(
		defaultPortfolioId.data ?? -1
	);

	React.useEffect(() => {
		let shouldCancel = false;
		if (!shouldCancel) setSelectedPortfolioId(defaultPortfolioId.data ?? -1);

		return () => {
			shouldCancel = true;
		};
	}, [defaultPortfolioId.data]);

	const handleSelectedPortfolioId = React.useCallback((e: React.SyntheticEvent) => {
		const target = e.target as HTMLOptionElement;
		setSelectedPortfolioId(Number(target.value));
	}, []);

	return (
		<PortfolioIdContext.Provider value={selectedPortfolioId}>
			<PortfolioIdUpdateContext.Provider value={handleSelectedPortfolioId}>
				{children}
			</PortfolioIdUpdateContext.Provider>
		</PortfolioIdContext.Provider>
	);
}

export function useSelectedPortfolioId() {
	const state = React.useContext(PortfolioIdContext);
	if (state === null) throw new Error('Cannot find PortfolioIdContextProvider');
	return state;
}

export function useSelectedPortfolioIdUpdate() {
	const state = React.useContext(PortfolioIdUpdateContext);
	if (state === null) throw new Error('Cannot find PortfolioIdUpdateContextProvider');
	return state;
}
