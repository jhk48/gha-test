import { SectorPieChartRatio } from '@types';

export default function calcSectorRatios(
	sectorMap: Map<string, string[]>,
	numOfHoldings: number
): SectorPieChartRatio[] {
	return [...sectorMap]
		.map(([sector, tickers]) => ({
			sector,
			ratio: tickers.length / numOfHoldings,
			includedStocks: [...tickers]
		}))
		.sort((a, b) => b.ratio - a.ratio);
}
