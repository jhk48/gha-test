import { Server } from 'socket.io';
import {
	ServerToClientEvents,
	ClientToServerEvents,
	InterServerEvents,
	SocketData,
	RealtimeData
} from '@portbullio/shared/src/types';
import getCachedStockOverviewData from './getCachedStockOverviewData';
import fetchStockOverviewData from './fetchStockOverviewData';
import saveRealtimeDataIntoDB from '../saveRealtimeDataIntoDB';
import transformRawStockOverviewData from './transformRawStockOverviewData';

export default async function emitStockOverviewData(
	io: Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>,
	userId: string,
	ticker: string
) {
	const cachedData = await getCachedStockOverviewData(ticker);
	if (!cachedData) {
		const newStockOverviewData = transformRawStockOverviewData(
			await fetchStockOverviewData(ticker)
		);
		if (!newStockOverviewData) return;
		await saveRealtimeDataIntoDB([{ ticker, ...newStockOverviewData }]);
		io.to(userId).emit('STOCK_OVERVIEW_DATA', newStockOverviewData);
		return;
	}

	io.to(userId).emit('STOCK_OVERVIEW_DATA', JSON.parse(cachedData) as RealtimeData);
}
