import { ClientStockRealtimeData, Holding } from '@portbullio/shared/src/types';

export default function calcTotalAssetAmount(
	holdingsList: Holding[],
	realtimeData: ClientStockRealtimeData
) {
	return holdingsList.reduce((acc, { ticker, buyQuantity, sellQuantity }) => {
		const holdingQuantity = buyQuantity - sellQuantity;
		return acc + Number(realtimeData[ticker]?.price ?? 0) * holdingQuantity;
	}, 0);
}
