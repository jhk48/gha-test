import { ClientStockRealtimeData, Holding } from '@portbullio/shared/src/types';

export default function calcTotalProfitLoss(
	holdingsList: Holding[],
	realtimeData: ClientStockRealtimeData
) {
	return holdingsList.reduce(
		(acc, { ticker, avgCost, buyQuantity, sellQuantity }) =>
			acc + (Number(realtimeData[ticker]?.price ?? 0) - avgCost) * (buyQuantity - sellQuantity),
		0
	);
}
