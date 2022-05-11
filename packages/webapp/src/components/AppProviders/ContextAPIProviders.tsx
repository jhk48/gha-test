import { ReactNode } from 'react';
import {
	AuthContextProvider,
	EventEmitterProvider,
	SocketIoContextProvider,
	RealtimeDataContextProvider,
	IsMarketOpenContextProvider
} from '@hooks/index';
import { SelectedPortfolioIdContextProvider } from '../SelectPortfolio/useSelectedPortfolioId';

interface Props {
	children: ReactNode;
	authContextInitialValue?: boolean;
	connectSocket?: boolean;
}

export default function ContextAPIProviders({
	children,
	authContextInitialValue,
	connectSocket
}: Props) {
	return (
		<AuthContextProvider initialValue={authContextInitialValue}>
			<EventEmitterProvider>
				<IsMarketOpenContextProvider>
					<RealtimeDataContextProvider>
						<SelectedPortfolioIdContextProvider>
							<SocketIoContextProvider shouldConnect={connectSocket}>
								{children}
							</SocketIoContextProvider>
						</SelectedPortfolioIdContextProvider>
					</RealtimeDataContextProvider>
				</IsMarketOpenContextProvider>
			</EventEmitterProvider>
		</AuthContextProvider>
	);
}
