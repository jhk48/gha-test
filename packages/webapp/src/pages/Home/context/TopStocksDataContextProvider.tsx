import * as React from 'react';
import { TopActives, TopGainers, TopLosers } from '@portbullio/shared/src/types';

interface ProviderProps {
	children: React.ReactNode;
}

type TopActivesUpdater = React.Dispatch<React.SetStateAction<TopActives | undefined>>;
type TopGainersUpdater = React.Dispatch<React.SetStateAction<TopGainers | undefined>>;
type TopLosersUpdater = React.Dispatch<React.SetStateAction<TopLosers | undefined>>;

const TopActivesContext = React.createContext<TopActives | null | undefined>(null);
const TopActivesUpdateContext = React.createContext<TopActivesUpdater | null>(null);

const TopGainersContext = React.createContext<TopGainers | null | undefined>(null);
const TopGainersUpdateContext = React.createContext<TopGainersUpdater | null>(null);

const TopLosersContext = React.createContext<TopLosers | null | undefined>(null);
const TopLosersUpdateContext = React.createContext<TopLosersUpdater | null>(null);

export function TopStocksDataContextProvider({ children }: ProviderProps) {
	const [topActives, setTopActives] = React.useState<TopActives>();
	const [topGainers, setTopGainers] = React.useState<TopGainers>();
	const [topLosers, setTopLosers] = React.useState<TopLosers>();

	return (
		<TopActivesContext.Provider value={topActives}>
			<TopActivesUpdateContext.Provider value={setTopActives}>
				<TopGainersContext.Provider value={topGainers}>
					<TopGainersUpdateContext.Provider value={setTopGainers}>
						<TopLosersContext.Provider value={topLosers}>
							<TopLosersUpdateContext.Provider value={setTopLosers}>
								{children}
							</TopLosersUpdateContext.Provider>
						</TopLosersContext.Provider>
					</TopGainersUpdateContext.Provider>
				</TopGainersContext.Provider>
			</TopActivesUpdateContext.Provider>
		</TopActivesContext.Provider>
	);
}

export function useTopActives() {
	const state = React.useContext(TopActivesContext);
	if (state === null) throw new Error('Cannot find TopActivesContext');
	return state;
}

export function useTopActivesUpdate() {
	const state = React.useContext(TopActivesUpdateContext);
	if (state === null) throw new Error('Cannot find TopActivesUpdateContext');
	return state;
}

export function useTopGainers() {
	const state = React.useContext(TopGainersContext);
	if (state === null) throw new Error('Cannot find TopGainersContext');
	return state;
}

export function useTopGainersUpdate() {
	const state = React.useContext(TopGainersUpdateContext);
	if (state === null) throw new Error('Cannot find TopGainersUpdateContext');
	return state;
}

export function useTopLosers() {
	const state = React.useContext(TopLosersContext);
	if (state === null) throw new Error('Cannot find TopLosersContext');
	return state;
}

export function useTopLosersUpdate() {
	const state = React.useContext(TopLosersUpdateContext);
	if (state === null) throw new Error('Cannot find TopLosersContext');
	return state;
}
