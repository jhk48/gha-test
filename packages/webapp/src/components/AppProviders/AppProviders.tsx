import { ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import ContextAPIProviders from './ContextAPIProviders';

interface Props {
	children: ReactNode;
}

const queryClient = new QueryClient();

export default function AppProviders({ children }: Props) {
	return (
		<BrowserRouter>
			<QueryClientProvider client={queryClient}>
				<ReactQueryDevtools initialIsOpen={false} />
				<ContextAPIProviders>{children}</ContextAPIProviders>
			</QueryClientProvider>
		</BrowserRouter>
	);
}
