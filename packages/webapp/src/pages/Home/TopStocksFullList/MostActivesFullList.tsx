import { DynamicCaret, ListContainer, ListItems } from '@components/index';
import { formatNum, formatCurrency } from '@utils';
import * as Style from './styles';
import { useTopStocksData } from '../hooks';

export default function MostActivesFullList() {
	const { topActives } = useTopStocksData();
	return (
		<>
			<Style.TopStocksFullListHeader>거래량 상위 종목</Style.TopStocksFullListHeader>
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
						isListEmpty={!topActives || topActives.length === 0}
						emptyListNoticeMessage="거래량 상위 종목 목록을 불러올 수 없습니다."
					>
						{topActives?.map(({ ticker, price, change, changePercent }) => (
							<Style.TopStocksFullListItem key={ticker} as="li" aria-label="Top actives list item">
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
