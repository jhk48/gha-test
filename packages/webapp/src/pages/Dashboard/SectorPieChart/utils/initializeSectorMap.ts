import { SectorInfo } from '@types';

export default function initializeSectorMap(sectors: SectorInfo[]) {
	const result = new Map<string, string[]>(sectors.map(({ sector }) => [sector, []]));
	sectors.forEach(({ sector, ticker }) => result.get(sector)?.push(ticker));
	return result;
}
