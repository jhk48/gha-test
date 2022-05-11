import { Server } from 'socket.io';
import {
	ServerToClientEvents,
	ClientToServerEvents,
	InterServerEvents,
	SocketData,
	TopStocks,
	TopStockData,
	TopStockCategory
} from '@portbullio/shared/src/types';
import * as TopStockService from '@services/topStocks';
import { topStockEventNames } from '@constants';

export default async function emitTopStocksData(
	io: Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>,
	userId: string,
	category: TopStockCategory
) {
	let cachedTopStocksData = await TopStockService.getTopStocksDataFromDB(category);
	if (!cachedTopStocksData) {
		const topStocksData = await TopStockService.fetchTopStocks(category);
		cachedTopStocksData = topStocksData;
	}

	if (!cachedTopStocksData) return;

	if (category === 'all') {
		io.to(userId).emit('TOP_ACTIVES_DATA', (cachedTopStocksData as TopStocks).actives);
		io.to(userId).emit('TOP_GAINERS_DATA', (cachedTopStocksData as TopStocks).gainers);
		io.to(userId).emit('TOP_LOSERS_DATA', (cachedTopStocksData as TopStocks).losers);
	} else {
		io.to(userId).emit(topStockEventNames[category], cachedTopStocksData as TopStockData[]);
	}
}
