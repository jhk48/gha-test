import { createClient } from 'redis';
import envConfig from '@config';

function reconnectStrategy(retries: number) {
	return 3000 + 2000 * retries;
}

export const marketStatusRedisClient = createClient({
	url: envConfig.redisHost,
	socket: { reconnectStrategy },
	database: 1
});

export const realtimeStockDataSubscribersRedisClient = createClient({
	url: envConfig.redisHost,
	socket: { reconnectStrategy },
	database: 2
});

export const stockOverviewPageDataSubscribersRedisClient = createClient({
	url: envConfig.redisHost,
	socket: { reconnectStrategy },
	database: 3
});

export const majorIndicesDataSubscribersRedisClient = createClient({
	url: envConfig.redisHost,
	socket: { reconnectStrategy },
	database: 4
});

export const topStocksDataSubscribersRedisClient = createClient({
	url: envConfig.redisHost,
	socket: { reconnectStrategy },
	database: 5
});

export const realtimeStockDataRedisClient = createClient({
	url: envConfig.redisHost,
	socket: { reconnectStrategy },
	database: 6
});

export const majorIndicesDataRedisClient = createClient({
	url: envConfig.redisHost,
	socket: { reconnectStrategy },
	database: 7
});

export const topStocksDataRedisClient = createClient({
	url: envConfig.redisHost,
	socket: { reconnectStrategy },
	database: 8
});
