import { Holding } from '@portbullio/shared/src/types';

export default function getHoldingsTickers(holdingsList: Holding[]) {
	return holdingsList.map(({ ticker }) => ticker);
}
