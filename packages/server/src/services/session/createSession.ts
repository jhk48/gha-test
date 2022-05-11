import { randomUUID } from 'crypto';
import { sessionRedisClient } from '@lib/redis';
import envConfig from '@config';

export default async function createSession(userId: number) {
	const sessionTTL = envConfig.sessionIdTTLInSec;
	const newSessionId = randomUUID();
	await sessionRedisClient.set(newSessionId, userId, { EX: sessionTTL });
	return newSessionId;
}
