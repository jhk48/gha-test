import { ClientStockRealtimeData, Holding } from '@portbullio/shared/src/types';

export default function calcDailyProfitLoss(
	holdingsList: Holding[],
	realtimeData: ClientStockRealtimeData
) {
	return holdingsList.reduce(
		(acc, { ticker, buyQuantity, sellQuantity }) =>
			acc + Number(realtimeData[ticker]?.change ?? 0) * (buyQuantity - sellQuantity),
		0
	);
}
