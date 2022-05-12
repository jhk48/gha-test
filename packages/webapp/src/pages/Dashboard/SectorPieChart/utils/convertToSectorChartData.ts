import { SectorPieChartRatio } from '@types';

export default function convertToSectorChartData(
	sectorRatios: SectorPieChartRatio[],
	numOfItems: number
) {
	if (sectorRatios.length === numOfItems) return sectorRatios;

	const others: SectorPieChartRatio = {
		sector: '기타',
		ratio: sectorRatios.slice(numOfItems - 1).reduce((acc, el) => acc + el.ratio, 0),
		includedStocks: sectorRatios
			.slice(numOfItems - 1)
			.map(({ includedStocks }) => [...includedStocks])
			.flat()
	};

	return numOfItems === 1
		? [others]
		: [...sectorRatios.slice(0, numOfItems - 1), others].sort((a, b) => b.ratio - a.ratio);
}
