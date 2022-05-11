import { Holding } from '@portbullio/shared/src/types';

export default function getHoldingOfTicker(holdingsList: Holding[] | undefined, ticker: string) {
	return holdingsList?.filter(holding => holding.ticker === ticker)[0] ?? undefined;
}
