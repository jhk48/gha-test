import { ListItems, ListItem, EmptyListNotice } from '@components/ListPage';
import DynamicCaret from '@components/DynamicCaret';
import { Holding } from '@portbullio/shared/src/types';
import { useRealtimeData } from '@hooks/index';
import { formatNum, formatCurrency } from '@utils';
import * as Style from './styles';

interface Props {
	holdingsList: Holding[] | undefined;
	isLoading: boolean;
}

export default function HoldingsList({ holdingsList, isLoading }: Props) {
	const realtimeData = useRealtimeData();

	if (isLoading) {
		return <EmptyListNotice>로딩 중...</EmptyListNotice>;
	}

	return (
		<ListItems
			isListEmpty={!holdingsList || holdingsList.length === 0}
			emptyListNoticeMessage="보유종목이 없습니다."
		>
			{holdingsList?.map(({ ticker, avgCost, buyQuantity, sellQuantity }) => {
				const realtimePrice = realtimeData[ticker]?.price ?? 0;
				const realtimeChange = realtimeData[ticker]?.change ?? 0;
				const realtimeChangePercent = realtimeData[ticker]?.changePercent ?? 0;
				const holdingQuantity = buyQuantity - sellQuantity;
				const totalGain = (realtimePrice - avgCost) * holdingQuantity;
				const totalGainPercent = ((realtimePrice - avgCost) / avgCost) * 100;

				return (
					<ListItem key={ticker}>
						<Style.HoldingTickerSection>{ticker}</Style.HoldingTickerSection>
						<Style.HoldingDetailsSection>
							<Style.HoldingDetailsOpenButton to={`/stock-transactions/${ticker}`}>
								거래내역 자세히 보기
							</Style.HoldingDetailsOpenButton>
						</Style.HoldingDetailsSection>
						<Style.HoldingCurrentPriceSection value={realtimeChange}>
							<DynamicCaret width={20} height={20} value={realtimeChange} marginTop={2} />
							{formatCurrency(realtimePrice, 'usd')}&#40;
							{formatNum(realtimeChange, { signDisplay: 'exceptZero' })}&#41;
						</Style.HoldingCurrentPriceSection>
						<Style.HoldingAvgPriceSection>
							{formatCurrency(avgCost, 'usd')}
						</Style.HoldingAvgPriceSection>
						<Style.HoldingQuantitySection>
							{formatNum(holdingQuantity)}
						</Style.HoldingQuantitySection>
						<Style.HoldingTotalValueSection>
							{formatCurrency(realtimePrice * holdingQuantity, 'usd')}
						</Style.HoldingTotalValueSection>
						<Style.HoldingDailyGainSection value={realtimeChangePercent}>
							<DynamicCaret width={20} height={20} value={realtimeChangePercent} marginTop={2} />
							{formatCurrency(realtimeChange * holdingQuantity, 'usd')}&#40;
							{formatNum(realtimeChangePercent, { signDisplay: 'exceptZero' })}
							%&#41;
						</Style.HoldingDailyGainSection>
						<Style.HoldingTotalGainSection value={totalGain}>
							<DynamicCaret width={20} height={20} value={totalGain} marginTop={2} />
							{formatCurrency(totalGain, 'usd')}&#40;
							{formatNum(totalGainPercent, { signDisplay: 'exceptZero' })}
							%&#41;
						</Style.HoldingTotalGainSection>
					</ListItem>
				);
			})}
		</ListItems>
	);
}
