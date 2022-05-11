import { LoaderProps } from '@src/types';
import logger from '@lib/winston';
import { sessionRedisClient, marketStatusRedisClient } from '@lib/redis';
import expressLoader from './express';

export default async function appLoader({ app }: LoaderProps) {
	await expressLoader({ app });
	logger.info('Express loaded');

	await sessionRedisClient.connect();
	await marketStatusRedisClient.connect();
	sessionRedisClient.on('error', err => logger.error('Session Redis Client Error', err));
	marketStatusRedisClient.on('error', err => logger.error('Market Status Redis Client Error', err));
}
