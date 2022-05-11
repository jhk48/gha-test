import { CashTransactionLog } from '@prisma/client';
import { ClientStockRealtimeData, Holding } from '@portbullio/shared/src/types';
import { formatNum, formatCurrency, calcTotalCashAmount } from '@utils';
import {
	DynamicCaret,
	LineChartAsc as LineChartAscIcon,
	BarChartArrowAsc as BarChartArrowAscIcon,
	MoneySack as MoneySackIcon
} from '@components/index';
import { calcTotalAssets, calcTotalCost, calcDailyProfitLoss, calcTotalProfitLoss } from './utils';
import * as Style from '../styles';

interface Props {
	holdingsList: Holding[];
	realtimeData: ClientStockRealtimeData;
	cashTransactions: CashTransactionLog[];
}

export default function ProfitLossAsset({ holdingsList, realtimeData, cashTransactions }: Props) {
	const totalCashAmount = calcTotalCashAmount(cashTransactions);
	const totalAssets = calcTotalAssets(holdingsList, realtimeData) + totalCashAmount;
	const totalCost = calcTotalCost(holdingsList) + totalCashAmount;
	const dailyProfitLoss = calcDailyProfitLoss(holdingsList, realtimeData);
	const totalProfitLoss = calcTotalProfitLoss(holdingsList, realtimeData);

	return (
		<Style.ProfitLossAssetContainer>
			<Style.ProfitLossAssetItem>
				<Style.ItemIconContainer bgColor="gray">
					<LineChartAscIcon width={24} height={24} />
				</Style.ItemIconContainer>
				<Style.ItemHeader>오늘 손익</Style.ItemHeader>
				<Style.ProfitLossAssetAmount value={dailyProfitLoss}>
					{formatCurrency(dailyProfitLoss, 'usd')}
				</Style.ProfitLossAssetAmount>
				<Style.ProfitLossAssetPercent value={dailyProfitLoss}>
					<DynamicCaret value={dailyProfitLoss} width={18} height={18} marginTop={2} />
					{totalCost === 0 ? 0 : formatNum(((dailyProfitLoss / totalCost) * 100).toFixed(2))}%
				</Style.ProfitLossAssetPercent>
			</Style.ProfitLossAssetItem>
			<Style.ProfitLossAssetItem>
				<Style.ItemIconContainer bgColor="gray">
					<BarChartArrowAscIcon width={24} height={24} />
				</Style.ItemIconContainer>
				<Style.ItemHeader>총 손익</Style.ItemHeader>
				<Style.ProfitLossAssetAmount value={totalProfitLoss}>
					{formatCurrency(totalProfitLoss, 'usd')}
				</Style.ProfitLossAssetAmount>
				<Style.ProfitLossAssetPercent value={totalProfitLoss}>
					<DynamicCaret value={totalProfitLoss} width={18} height={18} marginTop={2} />
					{totalCost === 0 ? 0 : formatNum(((totalProfitLoss / totalCost) * 100).toFixed(2))}%
				</Style.ProfitLossAssetPercent>
			</Style.ProfitLossAssetItem>
			<Style.ProfitLossAssetItem>
				<Style.ItemIconContainer bgColor="gray">
					<MoneySackIcon width={24} height={24} />
				</Style.ItemIconContainer>
				<Style.ItemHeader>총 자산</Style.ItemHeader>
				<Style.ProfitLossAssetAmount>
					{formatCurrency(totalAssets, 'usd')}
				</Style.ProfitLossAssetAmount>
			</Style.ProfitLossAssetItem>
		</Style.ProfitLossAssetContainer>
	);
}
