import { SyntheticEvent, useEffect } from 'react';
import { Outlet, useParams, useNavigate } from 'react-router-dom';
import { DynamicCaret } from '@components/index';
import { useTitle } from '@hooks/Title';
import { formatNum } from '@utils';
import { searchTickers } from '@api/stock';
import * as Style from './styles';
import { useCompanyName, useExchangeName } from '../queries';
import { useSubscribeStockOverviewData } from '../hooks';
import StockInfoPanel from './StockInfoPanel';

export default function StockMain() {
	const navigate = useNavigate();
	const { ticker } = useParams() as { ticker: string };
	useTitle(`Portbullio - ${ticker}`);
	const companyName = useCompanyName(ticker);
	const exchangeName = useExchangeName(ticker);
	const stockOverviewData = useSubscribeStockOverviewData(ticker);

	useEffect(() => {
		(async () => {
			if (!(await isValidTicker(ticker))) {
				navigate('/invalid-ticker', { replace: true });
			}
		})();
	}, [navigate, ticker]);

	function showPageIsNotPrepared(e: SyntheticEvent) {
		e.preventDefault();
		alert('현재 준비중인 페이지입니다.');
	}

	return (
		<>
			<Style.StockMainSection>
				<section>
					<Style.CompanyName aria-label="Company name">{companyName.data}</Style.CompanyName>
					<Style.TickerContainer>
						<Style.Ticker aria-label="Ticker name">{ticker.toUpperCase()}</Style.Ticker>
						<Style.StockExchange aria-label="Exchange name">
							{exchangeName.data}
						</Style.StockExchange>
					</Style.TickerContainer>
				</section>
				<Style.PriceSection value={stockOverviewData?.change ?? 0}>
					<Style.CurrentPrice aria-label="Current price">
						<Style.CurrencySymbol aria-label="Currency symbol">$</Style.CurrencySymbol>
						{formatNum(stockOverviewData?.price ?? 0)}
					</Style.CurrentPrice>
					<Style.PriceChangeContainer>
						<Style.PriceChange aria-label="Price change">
							<DynamicCaret value={stockOverviewData?.change ?? 0} width={24} height={24} />
							{formatNum(stockOverviewData?.change ?? 0)}
						</Style.PriceChange>
						&#40;{formatNum(stockOverviewData?.changePercent ?? 0)}%&#41;
					</Style.PriceChangeContainer>
				</Style.PriceSection>
				<Style.StockMenuSection>
					<Style.StockMenuLink to="chart">차트</Style.StockMenuLink>
					<Style.StockMenuLink to="info" onClick={showPageIsNotPrepared}>
						기업 정보
					</Style.StockMenuLink>
					<Style.StockMenuLink to="financial" onClick={showPageIsNotPrepared}>
						재무 정보
					</Style.StockMenuLink>
					<Style.StockMenuLink to="news" onClick={showPageIsNotPrepared}>
						뉴스
					</Style.StockMenuLink>
				</Style.StockMenuSection>
			</Style.StockMainSection>
			<Style.StockSubSection>
				<Style.StockSubPageWrapper>
					<Outlet />
				</Style.StockSubPageWrapper>
				<StockInfoPanel stockInfoData={stockOverviewData} />
			</Style.StockSubSection>
		</>
	);
}

async function isValidTicker(ticker: string) {
	const res = await searchTickers(ticker);
	if (res.length === 0) return false;
	return true;
}
