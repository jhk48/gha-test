import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from 'react-query';
import { EventEmitterProvider } from '@hooks/EventEmitter';
import StockMain from '../Main';
import StockInfoPanel from '../Main/StockInfoPanel';

const queryClient = new QueryClient();

test('Should render AAPL stock page', () => {
	render(
		<MemoryRouter initialEntries={['/stock/aapl']}>
			<QueryClientProvider client={queryClient}>
				<EventEmitterProvider>
					<Routes>
						<Route path="stock/:ticker" element={<StockMain />} />
					</Routes>
				</EventEmitterProvider>
			</QueryClientProvider>
		</MemoryRouter>
	);

	expect(screen.getByLabelText('Company name')).toBeInTheDocument();
	expect(screen.getByLabelText('Ticker name')).toHaveTextContent('AAPL');
	expect(screen.getByLabelText('Exchange name')).toBeInTheDocument();
});

test('Should render TSLA stock page', () => {
	render(
		<MemoryRouter initialEntries={['/stock/tsla']}>
			<QueryClientProvider client={queryClient}>
				<EventEmitterProvider>
					<Routes>
						<Route path="stock/:ticker" element={<StockMain />} />
					</Routes>
				</EventEmitterProvider>
			</QueryClientProvider>
		</MemoryRouter>
	);

	expect(screen.getByLabelText('Company name')).toBeInTheDocument();
	expect(screen.getByLabelText('Ticker name')).toHaveTextContent('TSLA');
	expect(screen.getByLabelText('Exchange name')).toBeInTheDocument();
});

test('Should have a current price component', () => {
	render(
		<MemoryRouter initialEntries={['/stock/aapl']}>
			<QueryClientProvider client={queryClient}>
				<EventEmitterProvider>
					<Routes>
						<Route path="stock/:ticker" element={<StockMain />} />
					</Routes>
				</EventEmitterProvider>
			</QueryClientProvider>
		</MemoryRouter>
	);

	expect(screen.getByLabelText('Currency symbol')).toBeInTheDocument();
	expect(screen.getByLabelText('Current price')).toBeInTheDocument();
});

test('Should have a price change component', () => {
	render(
		<MemoryRouter initialEntries={['/stock/aapl']}>
			<QueryClientProvider client={queryClient}>
				<EventEmitterProvider>
					<Routes>
						<Route path="stock/:ticker" element={<StockMain />} />
					</Routes>
				</EventEmitterProvider>
			</QueryClientProvider>
		</MemoryRouter>
	);

	expect(screen.getByLabelText('Price change')).toBeInTheDocument();
});

test('Should have four stock menu links', () => {
	render(
		<MemoryRouter initialEntries={['/stock/aapl']}>
			<QueryClientProvider client={queryClient}>
				<EventEmitterProvider>
					<Routes>
						<Route path="stock/:ticker" element={<StockMain />} />
					</Routes>
				</EventEmitterProvider>
			</QueryClientProvider>
		</MemoryRouter>
	);

	expect(screen.getByRole('link', { name: '차트' })).toBeInTheDocument();
	expect(screen.getByRole('link', { name: '기업 정보' })).toBeInTheDocument();
	expect(screen.getByRole('link', { name: '재무 정보' })).toBeInTheDocument();
	expect(screen.getByRole('link', { name: '뉴스' })).toBeInTheDocument();
});

test('Should have a stock overview info panel', () => {
	render(
		<StockInfoPanel
			stockInfoData={{
				price: 0,
				change: 0,
				changePercent: 0,
				open: 0,
				prevClose: 0,
				low: 0,
				high: 0,
				marketCap: 0,
				volume: 0,
				week52High: 0,
				week52Low: 0,
				peRatio: 0
			}}
		/>
	);

	expect(screen.getByLabelText('Stock info panel')).toBeInTheDocument();
});

test('Should show a loading indicator instead of stock info panel', () => {
	render(<StockInfoPanel stockInfoData={undefined} />);

	expect(screen.getAllByLabelText('Loading skeleton')[0]).toBeInTheDocument();
});

test('Should have stock overview info panel items', () => {
	render(
		<StockInfoPanel
			stockInfoData={{
				price: 0,
				change: 0,
				changePercent: 0,
				open: 0,
				prevClose: 0,
				low: 0,
				high: 0,
				marketCap: 0,
				volume: 0,
				week52High: 0,
				week52Low: 0,
				peRatio: 0
			}}
		/>
	);

	expect(screen.getByText('시가')).toBeInTheDocument();
	expect(screen.getByText('전일 종가')).toBeInTheDocument();
	expect(screen.getByText('고가')).toBeInTheDocument();
	expect(screen.getByText('저가')).toBeInTheDocument();
	expect(screen.getByText('시가총액')).toBeInTheDocument();
	expect(screen.getByText('거래량')).toBeInTheDocument();
	expect(screen.getByText('52주 최고')).toBeInTheDocument();
	expect(screen.getByText('52주 최저')).toBeInTheDocument();
	expect(screen.getByText('P/E')).toBeInTheDocument();
});
