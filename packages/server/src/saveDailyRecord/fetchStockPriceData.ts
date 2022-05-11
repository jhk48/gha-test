import { io, Socket } from 'socket.io-client';
import envConfig from '@config';
import {
	ServerToClientEvents,
	ClientToServerEvents,
	ClientStockRealtimeData
} from '@portbullio/shared/src/types';

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
	envConfig.socketServerUrl as string
);

export default function fetchStockPriceData(tickers: string[]): Promise<ClientStockRealtimeData> {
	socket.emit('REQ_CACHED_DATA', [...tickers]);
	return new Promise((resolve, reject) => {
		socket.on('CACHED_DATA', data => {
			socket.close();
			resolve(data);
		});
		socket.on('connect_error', reject);
	});
}
