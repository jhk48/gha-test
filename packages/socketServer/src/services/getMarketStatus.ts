import { marketStatusRedisClient } from '@lib/index';

export default async function getMarketStatus(): Promise<boolean> {
	const result = (await marketStatusRedisClient.get('isMarketOpen')) ?? 'false';
	return result === 'true';
}
