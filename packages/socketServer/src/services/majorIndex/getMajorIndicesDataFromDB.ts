import { MajorIndices } from '@portbullio/shared/src/types';
import { majorIndicesDataRedisClient } from '@lib/index';
import transformMajorIndexData from './transformMajorIndexData';

type MajorIndicesTickers = readonly (keyof MajorIndices)[];

const indexTickers: MajorIndicesTickers = ['DJI', 'GSPC', 'IXIC'] as const;

export default async function getMajorIndicesDataFromDB(): Promise<MajorIndices | null> {
	try {
		const majorIndexData = await Promise.all(
			indexTickers.map(ticker => majorIndicesDataRedisClient.get(ticker))
		);

		if (majorIndexData.some(res => res === null)) return null;

		return transformMajorIndexData(
			majorIndexData.map((data, idx) => ({
				ticker: indexTickers[idx],
				...JSON.parse(data ?? '')
			}))
		);
	} catch (error) {
		return null;
	}
}
