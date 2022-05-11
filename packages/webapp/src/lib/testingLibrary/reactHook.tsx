/* eslint-disable no-console */
import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider, setLogger } from 'react-query';
import { ContextAPIProviders } from '@components/index';

setLogger({
	log: console.log,
	warn: console.warn,
	// ✅ no more errors on the console
	error: () => {}
});

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false
		}
	}
});

export const createHookQueryWrapper = () => {
	return function ({ children }: { children: ReactNode }) {
		return (
			<QueryClientProvider client={queryClient}>
				<ContextAPIProviders connectSocket={false}>{children}</ContextAPIProviders>
			</QueryClientProvider>
		);
	};
};
