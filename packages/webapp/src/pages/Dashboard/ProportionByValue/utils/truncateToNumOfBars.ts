import { HoldingsRatio } from '@types';

export default function truncateToNumOfBars(
	ratios: HoldingsRatio[],
	numOfBars: number
): HoldingsRatio[] {
	if (numOfBars === ratios.length) return ratios;

	const others: HoldingsRatio = {
		ticker: '기타',
		ratio: ratios.slice(numOfBars - 1).reduce((acc, el) => acc + el.ratio, 0),
		value: ratios.slice(numOfBars - 1).reduce((acc, el) => acc + el.value, 0)
	};

	return numOfBars === 1
		? [others]
		: [...ratios.slice(0, numOfBars - 1), others].sort((a, b) => b.ratio - a.ratio);
}
