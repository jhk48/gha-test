import { Server } from 'socket.io';
import {
	ServerToClientEvents,
	ClientToServerEvents,
	InterServerEvents,
	SocketData
} from '@portbullio/shared/src/types';
import getTickersPerUserFromDB from './getTickersPerUserFromDB';
import getRealtimeDataFromDB from './getRealtimeDataFromDB';
import formatRealtimeDataToEmit from './formatRealtimeDataToEmit';

export default async function broadcastRealtimeData(
	io: Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>
) {
	const tickersPerUser = await getTickersPerUserFromDB();
	const realtimeData = await Promise.all(
		tickersPerUser.map(({ tickers }) => getRealtimeDataFromDB(tickers))
	);

	const realtimeDataPerUser = realtimeData.map((data, idx) => ({
		userId: tickersPerUser[idx].userId,
		data
	}));

	realtimeDataPerUser.forEach(({ userId, data }) => {
		io.to(userId).emit('REALTIME_DATA', formatRealtimeDataToEmit(data));
	});
}
