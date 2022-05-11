import { sessionRedisClient } from '@lib/redis';

export default async function checkSession(sessionId: string) {
	const userId = await sessionRedisClient.get(sessionId);
	return userId;
}
