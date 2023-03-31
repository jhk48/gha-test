import { createSecureServer } from 'http2';
import { resolve } from 'path';
import { readFileSync } from 'fs';
import { Server } from 'socket.io';
import loaders from '@loaders';
import envConfig from '@config';
import logger from '@lib/winston';
import {
	ServerToClientEvents,
	ClientToServerEvents,
	InterServerEvents,
	SocketData
} from '@portbullio/shared/src/types';

const a = 125510
async function startServer() {
	const httpServer = createSecureServer({
		allowHTTP1: true,
		key: readFileSync(resolve(__dirname, '../', 'private.pem')),
		cert: readFileSync(resolve(__dirname, '../', 'public.pem'))
	});

	const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(
		httpServer as any,
		{
			cors: {
				origin: envConfig.origin
			},
			transports: ['websocket', 'polling']
		}
	);
	await loaders(io);

	httpServer.listen(envConfig.port);
	logger.info(`### Socket server listening on port: ${envConfig.port} ###`);
}

startServer();

