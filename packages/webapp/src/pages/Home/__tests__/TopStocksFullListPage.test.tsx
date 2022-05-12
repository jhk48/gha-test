import { render, screen } from '@testing-library/react';
import { CustomWrapper } from '@lib/testingLibrary/react';
import { TopStocksDataContextProvider } from '../context/TopStocksDataContextProvider';
import MostActivesFullListPage from '../TopStocksFullList/MostActivesFullList';
import MostGainersFullListPage from '../TopStocksFullList/MostGainersFullList';
import MostLosersFullListPage from '../TopStocksFullList/MostLosersFullList';

describe('MostActivesFullListPage', () => {
	test(`Should have a '거래량 상위 종목' header`, () => {
		render(
			<CustomWrapper>
				<TopStocksDataContextProvider>
					<MostActivesFullListPage />
				</TopStocksDataContextProvider>
			</CustomWrapper>
		);

		expect(screen.getByText('거래량 상위 종목')).toBeInTheDocument();
	});

	test(`Should have top active list item headers`, () => {
		render(
			<CustomWrapper>
				<TopStocksDataContextProvider>
					<MostActivesFullListPage />
				</TopStocksDataContextProvider>
			</CustomWrapper>
		);

		expect(screen.getByText('티커')).toBeInTheDocument();
		expect(screen.getByText('가격')).toBeInTheDocument();
		expect(screen.getByText('전일 대비')).toBeInTheDocument();
		expect(screen.getByText('전일 대비(%)')).toBeInTheDocument();
	});

	test(`Should have top actives list item headers`, () => {
		render(
			<CustomWrapper>
				<TopStocksDataContextProvider initialTopActivesData={mockTopActivesData}>
					<MostActivesFullListPage />
				</TopStocksDataContextProvider>
			</CustomWrapper>
		);

		expect(screen.getAllByLabelText('Top actives list item')).toHaveLength(3);
		expect(screen.getByText('AMD')).toBeInTheDocument();
		expect(screen.getByText('AAPL')).toBeInTheDocument();
		expect(screen.getByText('NIO')).toBeInTheDocument();
	});
});

describe('MostGainersFullListPage', () => {
	test(`Should have a '상승률 상위 종목' header`, () => {
		render(
			<CustomWrapper>
				<TopStocksDataContextProvider>
					<MostGainersFullListPage />
				</TopStocksDataContextProvider>
			</CustomWrapper>
		);

		expect(screen.getByText('상승률 상위 종목')).toBeInTheDocument();
	});

	test(`Should have top active list item headers`, () => {
		render(
			<CustomWrapper>
				<TopStocksDataContextProvider>
					<MostGainersFullListPage />
				</TopStocksDataContextProvider>
			</CustomWrapper>
		);

		expect(screen.getByText('티커')).toBeInTheDocument();
		expect(screen.getByText('가격')).toBeInTheDocument();
		expect(screen.getByText('전일 대비')).toBeInTheDocument();
		expect(screen.getByText('전일 대비(%)')).toBeInTheDocument();
	});

	test(`Should have top gainers list item headers`, () => {
		render(
			<CustomWrapper>
				<TopStocksDataContextProvider initialTopGainersData={mockTopGainersData}>
					<MostGainersFullListPage />
				</TopStocksDataContextProvider>
			</CustomWrapper>
		);

		expect(screen.getAllByLabelText('Top gainers list item')).toHaveLength(3);
		expect(screen.getByText('BHVN')).toBeInTheDocument();
		expect(screen.getByText('APPN')).toBeInTheDocument();
		expect(screen.getByText('VRM')).toBeInTheDocument();
	});
});

describe('MostLosersFullListPage', () => {
	test(`Should have a '하락률 상위 종목' header`, () => {
		render(
			<CustomWrapper>
				<TopStocksDataContextProvider>
					<MostLosersFullListPage />
				</TopStocksDataContextProvider>
			</CustomWrapper>
		);

		expect(screen.getByText('하락률 상위 종목')).toBeInTheDocument();
	});

	test(`Should have top active list item headers`, () => {
		render(
			<CustomWrapper>
				<TopStocksDataContextProvider>
					<MostLosersFullListPage />
				</TopStocksDataContextProvider>
			</CustomWrapper>
		);

		expect(screen.getByText('티커')).toBeInTheDocument();
		expect(screen.getByText('가격')).toBeInTheDocument();
		expect(screen.getByText('전일 대비')).toBeInTheDocument();
		expect(screen.getByText('전일 대비(%)')).toBeInTheDocument();
	});

	test(`Should have top losers list item headers`, () => {
		render(
			<CustomWrapper>
				<TopStocksDataContextProvider initialTopLosersData={mockTopLosersData}>
					<MostLosersFullListPage />
				</TopStocksDataContextProvider>
			</CustomWrapper>
		);

		expect(screen.getAllByLabelText('Top losers list item')).toHaveLength(3);
		expect(screen.getByText('DM')).toBeInTheDocument();
		expect(screen.getByText('EMBK')).toBeInTheDocument();
		expect(screen.getByText('UPST')).toBeInTheDocument();
	});
});

const mockTopActivesData = [
	{
		ticker: 'AMD',
		price: 88.73,
		change: 2.37,
		changePercent: 2.7443292
	},
	{
		ticker: 'AAPL',
		price: 154.51,
		change: 2.45,
		changePercent: 1.611204
	},
	{
		ticker: 'NIO',
		price: 13.44,
		change: -0.11,
		changePercent: -0.81181264
	}
];

const mockTopGainersData = [
	{
		ticker: 'BHVN',
		price: 140,
		change: 56.86,
		changePercent: 68.39067
	},
	{
		ticker: 'APPN',
		price: 59.62,
		change: 16.6,
		changePercent: 38.5867
	},
	{
		ticker: 'VRM',
		price: 1.43,
		change: 0.35,
		changePercent: 32.4074
	}
];

const mockTopLosersData = [
	{
		ticker: 'DM',
		price: 1.33,
		change: -2.09,
		changePercent: -61.111115
	},
	{
		ticker: 'EMBK',
		price: 1.43,
		change: -2.06,
		changePercent: -59.025787
	},
	{
		ticker: 'UPST',
		price: 33.61,
		change: -43.52,
		changePercent: -56.424217
	}
];
