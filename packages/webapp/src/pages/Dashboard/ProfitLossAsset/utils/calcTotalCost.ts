import { Holding } from '@portbullio/shared/src/types';

export default function calcTotalCost(holdingsList: Holding[]) {
	return holdingsList.reduce(
		(acc, { avgCost, buyQuantity, sellQuantity }) => acc + avgCost * (buyQuantity - sellQuantity),
		0
	);
}
