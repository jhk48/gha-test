import { RealtimeDataProperties } from '@portbullio/shared/src/types';
import { formatCurrency, formatNum, abbreviateNumber } from '@utils';
import LoadingSkeleton from '@components/LoadingSkeleton';
import * as Style from './styles';

interface Props {
	stockInfoData: RealtimeDataProperties | undefined;
}

export default function StockInfoPanel({ stockInfoData }: Props) {
	return (
		<Style.StockInfoPanelContainer aria-label="Stock info panel">
			<Style.InfoPanel as="ul">
				{stockInfoData ? (
					<>
						<Style.PanelItem>
							<Style.PanelItemTitle>시가</Style.PanelItemTitle>
							{stockInfoData.open ? formatCurrency(stockInfoData.open, 'usd') : 'N/A'}
						</Style.PanelItem>
						<Style.PanelItem>
							<Style.PanelItemTitle>전일 종가</Style.PanelItemTitle>
							{stockInfoData.prevClose ? formatCurrency(stockInfoData.prevClose, 'usd') : 'N/A'}
						</Style.PanelItem>
						<Style.PanelItem>
							<Style.PanelItemTitle>고가</Style.PanelItemTitle>
							{stockInfoData.high ? formatCurrency(stockInfoData.high, 'usd') : 'N/A'}
						</Style.PanelItem>
						<Style.PanelItem>
							<Style.PanelItemTitle>저가</Style.PanelItemTitle>
							{stockInfoData.low ? formatCurrency(stockInfoData.low, 'usd') : 'N/A'}
						</Style.PanelItem>
						<Style.PanelItem>
							<Style.PanelItemTitle>시가총액</Style.PanelItemTitle>
							{stockInfoData.marketCap ? abbreviateNumber(stockInfoData.marketCap, 'usd') : 'N/A'}
						</Style.PanelItem>
						<Style.PanelItem>
							<Style.PanelItemTitle>거래량</Style.PanelItemTitle>
							{stockInfoData.volume ? abbreviateNumber(stockInfoData.volume, 'usd') : 'N/A'}
						</Style.PanelItem>
						<Style.PanelItem>
							<Style.PanelItemTitle>52주 최고</Style.PanelItemTitle>
							{stockInfoData.week52High ? formatCurrency(stockInfoData.week52High, 'usd') : 'N/A'}
						</Style.PanelItem>
						<Style.PanelItem>
							<Style.PanelItemTitle>52주 최저</Style.PanelItemTitle>
							{stockInfoData.week52Low ? formatCurrency(stockInfoData.week52Low, 'usd') : 'N/A'}
						</Style.PanelItem>
						<Style.PanelItem>
							<Style.PanelItemTitle>P/E</Style.PanelItemTitle>
							{stockInfoData.peRatio ? formatNum(stockInfoData.peRatio) : 'N/A'}
						</Style.PanelItem>
					</>
				) : (
					stockInfoKeys.map(key => (
						<Style.PanelItem key={key}>
							<LoadingSkeleton aria-label="Loading skeleton" height="calc(1em * 1.5)" />
						</Style.PanelItem>
					))
				)}
			</Style.InfoPanel>
		</Style.StockInfoPanelContainer>
	);
}

const stockInfoKeys = [
	'open',
	'prevClose',
	'high',
	'low',
	'marketCap',
	'volume',
	'week52High',
	'week52Low',
	'peRatio'
] as const;
