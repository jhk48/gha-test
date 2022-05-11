import { ReactElement } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import * as Global from '@styles/Global';
import * as Page from '@pages/index';
import { EventEmitterListeners, PrivateRoute } from '@components/index';
import {
	useCheckSession,
	useAuth,
	useThemeMode,
	useSocketListeners,
	useSubscribeTickers,
	useEmitter
} from '@hooks/index';

function App(): ReactElement {
	useCheckSession({ routePath: '/' });
	useSocketListeners();
	useSubscribeTickers();
	useThemeMode();
	const isAuthenticated = useAuth();
	const navigate = useNavigate();
	const Emitter = useEmitter();

	Emitter.on('LOG_OUT', path => {
		if (path === '/welcome') navigate('/', { replace: true });
	});

	return (
		<EventEmitterListeners>
			<Global.CSSReset />
			<Global.GlobalStyles />
			<Global.ToastColors />
			<Routes>
				<Route path="/" element={<Page.BaseLayout />}>
					<Route path="/" element={<Page.TopStocksDataContextWrapper />}>
						<Route index element={<Page.HomePage />} />
					</Route>
					<Route path="auth-error" element={<Page.AuthError />} />
					<Route path="welcome" element={<Page.WelcomePage />} />
					<Route path="stock/:ticker" element={<Page.StockMainPage />}>
						<Route path="chart" element={<Page.StockChartPage />} />
					</Route>
					<Route
						path="dashboard"
						element={
							<PrivateRoute isAllowed={isAuthenticated}>
								<Page.DashboardPage />
							</PrivateRoute>
						}
					/>
					<Route
						path="holdings"
						element={
							<PrivateRoute isAllowed={isAuthenticated}>
								<Page.HoldingsPage />
							</PrivateRoute>
						}
					/>
					<Route
						path="stock-transactions/:ticker"
						element={
							<PrivateRoute isAllowed={isAuthenticated}>
								<Page.StockTransactionsPage />
							</PrivateRoute>
						}
					/>
					<Route
						path="portfolios"
						element={
							<PrivateRoute isAllowed={isAuthenticated}>
								<Page.PortfoliosPage />
							</PrivateRoute>
						}
					/>
					<Route
						path="cash"
						element={
							<PrivateRoute isAllowed={isAuthenticated}>
								<Page.CashPage />
							</PrivateRoute>
						}
					/>
					<Route
						path="profile"
						element={
							<PrivateRoute isAllowed={isAuthenticated}>
								<Page.UserProfilePage />
							</PrivateRoute>
						}
					/>
				</Route>
				<Route path="/invalid-ticker" element={<Page.InvalidTickerPage />} />
				<Route path="*" element={<Page.NotFoundPage />} />
			</Routes>
		</EventEmitterListeners>
	);
}

export default App;
