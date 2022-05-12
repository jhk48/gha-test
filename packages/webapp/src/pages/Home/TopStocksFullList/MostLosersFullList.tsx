import { DynamicCaret, ListContainer, ListItems } from '@components/index';
import { formatNum, formatCurrency } from '@utils';
import * as Style from './styles';
import { useTopStocksData } from '../hooks';

export default function MostLosersFullList() {
	const { topLosers } = useTopStocksData();
	return (
		<>
			<Style.TopStocksFullListHeader>하락률 상위 종목</Style.TopStocksFullListHeader>
			<Style.TopStocksFullListContainer>
				<ListContainer>
					<Style.TopStocksFullListItemHeaders>
						<Style.ListHeaderTickerSection>티커</Style.ListHeaderTickerSection>
						<Style.ListHeaderPriceSection>가격</Style.ListHeaderPriceSection>
						<Style.ListHeaderPriceChangeSection>전일 대비</Style.ListHeaderPriceChangeSection>
						<Style.ListHeaderPriceChangePercentSection>
							전일 대비&#40;%&#41;
						</Style.ListHeaderPriceChangePercentSection>
					</Style.TopStocksFullListItemHeaders>

					<ListItems
						maxHeight="70vh"
						isListEmpty={!topLosers || topLosers.length === 0}
						emptyListNoticeMessage="하락률 상위 종목 목록을 불러올 수 없습니다."
					>
						{topLosers?.map(({ ticker, price, change, changePercent }) => (
							<Style.TopStocksFullListItem key={ticker} as="li" aria-label="Top losers list item">
								<Style.TopStocksFullListItemLink to={`/stock/${ticker}/chart`}>
									<Style.ListItemTickerSection>{ticker}</Style.ListItemTickerSection>
									<Style.ListItemPriceSection value={change}>
										<DynamicCaret width={20} height={20} value={change} marginTop={2} />
										{formatCurrency(price, 'usd')}
									</Style.ListItemPriceSection>
									<Style.ListItemChangeSection value={change}>
										<DynamicCaret width={20} height={20} value={change} marginTop={2} />
										{formatCurrency(change, 'usd', { signDisplay: 'never' })}
									</Style.ListItemChangeSection>
									<Style.ListItemChangePercentSection value={change}>
										<DynamicCaret width={20} height={20} value={change} marginTop={2} />
										{formatNum(changePercent, { signDisplay: 'never' })}%
									</Style.ListItemChangePercentSection>
								</Style.TopStocksFullListItemLink>
							</Style.TopStocksFullListItem>
						))}
					</ListItems>
				</ListContainer>
			</Style.TopStocksFullListContainer>
		</>
	);
}
