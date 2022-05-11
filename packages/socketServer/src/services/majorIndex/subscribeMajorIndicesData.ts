import { majorIndicesDataSubscribersRedisClient, logger } from '@lib/index';

export default async function subscribeMajorIndicesData(userId: string) {
	try {
		await majorIndicesDataSubscribersRedisClient.set(userId, 'true');
		return true;
	} catch (error) {
		logger.error(error);
		return false;
	}
}
