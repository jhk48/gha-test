import { Server } from 'socket.io';
import {
	ServerToClientEvents,
	ClientToServerEvents,
	InterServerEvents,
	SocketData,
	RealtimeData
} from '@portbullio/shared/src/types';
import getTickerPerUserFromDB from './getTickerPerUserFromDB';
import { formatRealtimeDataToEmit } from '../realtimeStockData';

export default async function broadcastStockOverviewData(
	io: Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>,
	data: RealtimeData[]
) {
	const tickerPerUser = await getTickerPerUserFromDB();
	const realtimeData = formatRealtimeDataToEmit(data);

	tickerPerUser.forEach(({ userId, ticker }) => {
		if (!ticker) return;
		io.to(userId).emit('STOCK_OVERVIEW_DATA', realtimeData[ticker]);
	});
}
