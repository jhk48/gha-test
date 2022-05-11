import { ReactElement } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import { ContextAPIProviders } from '@components/index';

interface WrapperProps {
	children: ReactElement;
	authValue?: boolean;
	connectSocket?: boolean;
}

const queryClient = new QueryClient();

function CustomWrapper({ children, authValue = false, connectSocket = false }: WrapperProps) {
	return (
		<BrowserRouter>
			<QueryClientProvider client={queryClient}>
				<ContextAPIProviders authContextInitialValue={authValue} connectSocket={connectSocket}>
					{children}
				</ContextAPIProviders>
			</QueryClientProvider>
		</BrowserRouter>
	);
}

export { CustomWrapper };
