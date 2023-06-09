import { TopStockData } from '@portbullio/shared/src/types';
import { formatCurrency, formatNum } from '@utils';
import TopStocksSkeleton from './TopStocksSkeleton';
import * as Style from './styles';

interface Props {
	stockList: TopStockData[] | undefined;
}

export default function TopStocks({ stockList }: Props) {
	if (!stockList) return <TopStocksSkeleton />;

	return (
		<>
			{stockList.map(({ ticker, changePercent, price }) => (
				<Style.TopStocksListItem key={ticker} as="li" bgColorOnHover>
					<Style.TopStocksListItemLink to={`stock/${ticker}/chart`}>
						<Style.TopStocksListItemTicker>{ticker}</Style.TopStocksListItemTicker>
						<Style.TopStocksListItemChangePercent value={changePercent}>
							{formatNum(changePercent, { signDisplay: 'exceptZero' })}%
						</Style.TopStocksListItemChangePercent>
						<Style.TopStocksListItemPrice>
							{formatCurrency(price, 'usd')}
						</Style.TopStocksListItemPrice>
					</Style.TopStocksListItemLink>
				</Style.TopStocksListItem>
			))}
		</>
	);
}
