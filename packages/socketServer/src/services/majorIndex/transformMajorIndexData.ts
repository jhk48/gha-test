import { MajorIndices, MajorIndexData } from '@portbullio/shared/src/types';

export default function formatMajorIndexData(majorIndexData: MajorIndexData[]): MajorIndices {
	const result = new Map();
	majorIndexData.forEach(({ ticker, ...data }) => result.set(ticker, data));
	return Object.fromEntries(result);
}
