import { Outlet } from 'react-router-dom';
import { TopStocksDataContextProvider } from './TopStocksDataContextProvider';

export default function HomePageContextRouteWrapper() {
	return (
		<TopStocksDataContextProvider>
			<Outlet />
		</TopStocksDataContextProvider>
	);
}
