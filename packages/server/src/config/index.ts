import { join } from 'path';
import dotenv from 'dotenv';
import logger from '@lib/winston';

process.env.NODE_ENV = process.env.NODE_ENV ?? 'production';
const envFileName = process.env.NODE_ENV.trim() === 'production' ? '.env' : '.dev.env';

const envFound = dotenv.config({ path: join(__dirname, '..', '..', envFileName) });
if (envFound.error) {
	logger.error('Could not find .env file');
	throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

console.log('1234')

export default {
	port: Number(process.env.PORT),
	redisHost: process.env.REDIS_HOST,
	socketServerUrl: process.env.SOCKET_SERVER_URL,
	origin: process.env.ORIGIN,
	sessionIdTTLInSec: Number(process.env.SESSION_ID_TTL_IN_SEC),
	cookieDomain: process.env.COOKIE_DOMAIN,
	maxCookieAge: process.env.MAX_COOKIE_AGE,
	oauth: {
		redirectBaseUrl: process.env.OAUTH_REDIRECT_BASE_URL,
		google: {
			clientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
			clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
			postmanSecret: process.env.GOOGLE_POSTMAN_SECRET
		}
	},
	aws: {
		identityPoolId: process.env.AWS_IDENTITY_POOL_ID,
		region: process.env.AWS_REGION,
		bucketName: process.env.AWS_S3_BUCKET_NAME
	}
};
