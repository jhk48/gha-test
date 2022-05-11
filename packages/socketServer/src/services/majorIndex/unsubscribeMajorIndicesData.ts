import { majorIndicesDataSubscribersRedisClient, logger } from '@lib/index';

export default async function unsubscribeMajorIndicesData(userId: string) {
	try {
		await majorIndicesDataSubscribersRedisClient.del(userId);
		return true;
	} catch (error) {
		logger.error(error);
		return false;
	}
}
