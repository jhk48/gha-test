import express from 'express';
import { createServer } from 'spdy';
import path from 'path';
import { readFileSync } from 'fs';
import config from '@config';
import logger from '@lib/winston';
import loaders from '@loaders';

const serverOptions = {
	key: readFileSync(path.resolve(__dirname, '../', 'private.pem')),
	cert: readFileSync(path.resolve(__dirname, '../', 'public.pem'))
};

async function startServer() {
	const app = express();
	const server = createServer(serverOptions, app);

	await loaders({ app });
	server
		.listen(config.port, () => {
			logger.info(`### Server listening on port: ${config.port} ###`);
		})
		.on('error', err => {
			logger.error(err);
			process.exit(1);
		});
}

startServer();

// 122321
