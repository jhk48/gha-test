import { createClient } from 'redis';
import envConfig from '@config';

function reconnectStrategy(retries: number) {
	return 3000 + 2000 * retries;
}

export const sessionRedisClient = createClient({
	url: envConfig.redisHost,
	socket: { reconnectStrategy }
});

export const marketStatusRedisClient = createClient({
	url: envConfig.redisHost,
	socket: { reconnectStrategy },
	database: 1
});
