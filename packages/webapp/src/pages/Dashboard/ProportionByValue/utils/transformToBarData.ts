import { CashTransactionLog } from '@prisma/client';
import { calcTotalCashAmount } from '@src/utils';
import { ClientStockRealtimeData, Holding } from '@portbullio/shared/src/types';
import { HoldingsValues, HoldingsRatio } from '@types';

export default function transformToBarData(
	realtimeData: ClientStockRealtimeData,
	holdingsList: Holding[],
	cashTransactions: CashTransactionLog[]
): HoldingsRatio[] {
	const totalCashAmount = calcTotalCashAmount(cashTransactions);
	const cashInfo: Holding = {
		ticker: '현금',
		avgCost: totalCashAmount,
		buyQuantity: 1,
		sellQuantity: 0
	};

	const holdingsValues = [...holdingsList, cashInfo].map(data =>
		calcHoldingValues(realtimeData, data)
	);
	const totalAmount = holdingsValues.reduce(sumAmount, 0) || 1;
	return holdingsValues
		.map(({ ticker, value }) => ({ ticker, value, ratio: (value / totalAmount) * 100 }))
		.sort(sortByRatioDesc);
}

function calcHoldingValues(
	realtimeData: ClientStockRealtimeData,
	{ ticker, avgCost, buyQuantity, sellQuantity }: Holding
): HoldingsValues {
	const quantity = buyQuantity - sellQuantity;
	return {
		ticker,
		value: (realtimeData[ticker]?.price ?? avgCost) * quantity
	};
}

function sumAmount(acc: number, { value }: HoldingsValues) {
	return acc + value;
}

function sortByRatioDesc(a: HoldingsRatio, b: HoldingsRatio) {
	return b.ratio - a.ratio;
}
