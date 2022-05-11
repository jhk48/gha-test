import { sessionRedisClient } from '@lib/redis';

export default async function deleteSession(sessionId: string) {
	await sessionRedisClient.del(sessionId);
	return;
}
