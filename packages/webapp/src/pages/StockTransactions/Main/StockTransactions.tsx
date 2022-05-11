import { useParams, Navigate } from 'react-router-dom';
import { StockTransactionLog } from '@prisma/client';
import * as ListPage from '@components/ListPage';
import { usePortfolioList, useHoldingsList, useTitle } from '@hooks/index';
import { DECIMAL_DIGITS } from '@constants/index';
import {
	ListQueryErrorBoundary,
	Filter as FilterIcon,
	ArrowBack as ArrowBackIcon,
	useSelectedPortfolioId
} from '@components/index';
import {
	formatNum,
	formatCurrency,
	getHoldingOfTicker,
	prefixPlusChar,
	truncateDecimalPoint
} from '@utils';
import * as Style from './styles';
import StockTransactionList from './StockTransactionList';
import { useStockTransactionLogs } from '../queries';

export default function StockTransactions() {
	const { ticker } = useParams() as { ticker: string };
	useTitle(`Portbullio - ${ticker} 거래내역`);
	const portfolioId = useSelectedPortfolioId();
	const stockTransactionList = useStockTransactionLogs(portfolioId, ticker);
	const portfolioList = usePortfolioList();
	const holdingsList = useHoldingsList(portfolioId);
	const holdingInfo = getHoldingOfTicker(holdingsList.data, ticker);
	const totalRealizedProfitLossAmount = totalRealizedProfitAndLoss(stockTransactionList.data);
	const totalRealizedProfitLossPercent = calcRealizedProfitAndLossPercent(
		stockTransactionList.data
	);

	if (!holdingInfo) {
		return <Navigate to="/holdings" replace />;
	}

	return (
		<>
			<ListPage.UpperSection maxWidth="1440px">
				<Style.SubHeader>
					{portfolioList.data?.filter(el => el.id === portfolioId)[0]?.name}의
				</Style.SubHeader>
				<ListPage.MainHeader>{ticker} 거래내역</ListPage.MainHeader>
				<ListPage.NumOfItems data-testid="num-of-holdings">
					{formatNum(stockTransactionList.data?.length ?? 0)}개
				</ListPage.NumOfItems>
				<ListPage.UpperSectionButtonContainer>
					<ListPage.SearchFilterButton type="button">
						<FilterIcon width={20} height={20} />
						필터
					</ListPage.SearchFilterButton>
					<Style.BackToHoldingsPageButton to="/holdings">
						<ArrowBackIcon width={16} height={16} />내 종목 페이지로
					</Style.BackToHoldingsPageButton>
				</ListPage.UpperSectionButtonContainer>
				<Style.TotalRealizedProfitLossSection>
					<Style.TotalRealizedProfitLossAmount value={totalRealizedProfitLossAmount}>
						<span>총 실현손익: </span>
						{formatCurrency(
							truncateDecimalPoint(totalRealizedProfitLossAmount, DECIMAL_DIGITS),
							'usd'
						)}
						&nbsp;&#40;{prefixPlusChar(totalRealizedProfitLossPercent)}
						{formatNum(truncateDecimalPoint(totalRealizedProfitLossPercent, DECIMAL_DIGITS))}%&#41;
					</Style.TotalRealizedProfitLossAmount>
					<Style.CurrentAvgCost>
						<span>평단가: </span>
						{formatCurrency(truncateDecimalPoint(holdingInfo?.avgCost ?? 0, DECIMAL_DIGITS), 'usd')}
					</Style.CurrentAvgCost>
				</Style.TotalRealizedProfitLossSection>
			</ListPage.UpperSection>
			<ListPage.LowerSection maxWidth="1250px">
				<ListPage.ListContainer>
					<ListPage.ListHeaderContainer>
						<Style.DateSection>날짜</Style.DateSection>
						<Style.TransactionTypeSection>종류</Style.TransactionTypeSection>
						<Style.PriceSection>가격</Style.PriceSection>
						<Style.QuantitySection>수량</Style.QuantitySection>
						<Style.MemoSection>메모</Style.MemoSection>
						<Style.RealizedProfitAndLossSection>실현손익</Style.RealizedProfitAndLossSection>
						<Style.StockTransactionActionsSection />
					</ListPage.ListHeaderContainer>
					<ListQueryErrorBoundary
						errorMessage="에러가 발생했습니다."
						isError={stockTransactionList.isError}
						refetch={stockTransactionList.refetch}
					>
						<StockTransactionList
							stockTransactionList={stockTransactionList.data}
							isLoading={stockTransactionList.isLoading}
						/>
					</ListQueryErrorBoundary>
				</ListPage.ListContainer>
			</ListPage.LowerSection>
		</>
	);
}

function totalRealizedProfitAndLoss(transactionList: StockTransactionLog[] | undefined) {
	if (!transactionList || transactionList.length === 0) return 0;
	return transactionList.reduce(sumTotalRealizedProfitLoss, 0);
}

function calcRealizedProfitAndLossPercent(transactionList: StockTransactionLog[] | undefined) {
	if (!transactionList || transactionList.length === 0) return 0;
	const sumProfitAndLoss = totalRealizedProfitAndLoss(transactionList);
	const sumCost = transactionList.reduce(sumTotalRealizedCost, 0);
	if (sumCost <= 0) return 0;
	return (sumProfitAndLoss / sumCost) * 100;
}

function sumTotalRealizedProfitLoss(
	acc: number,
	{ avgBuyCost, price, quantity }: StockTransactionLog
) {
	if (!avgBuyCost) return acc;
	return acc + (price - avgBuyCost) * quantity;
}

function sumTotalRealizedCost(acc: number, { avgBuyCost, quantity }: StockTransactionLog) {
	if (!avgBuyCost) return acc;
	return acc + avgBuyCost * quantity;
}
