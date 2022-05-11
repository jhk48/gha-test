import { majorIndicesDataSubscribersRedisClient } from '@lib/index';

export default async function getAllMajorIndicesDataSubscribers() {
	try {
		const result = await majorIndicesDataSubscribersRedisClient.keys('*');
		return result;
	} catch (error) {
		return [];
	}
}
