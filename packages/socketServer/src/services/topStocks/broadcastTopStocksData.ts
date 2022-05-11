import { Server } from 'socket.io';
import {
	ServerToClientEvents,
	ClientToServerEvents,
	InterServerEvents,
	SocketData,
	RealtimeData,
	TopStocks
} from '@portbullio/shared/src/types';
import { topStocksCategories, topStockEventNames } from '@constants';
import getTopStockCategoryPerUserFromDB from './getTopStockCategoryPerUserFromDB';
import getTopStocksDataFromDB from './getTopStocksDataFromDB';

export default async function broadcastTopStocksData(
	io: Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>
) {
	const categoryPerUser = await getTopStockCategoryPerUserFromDB();
	const topStocksData = await Promise.all(
		categoryPerUser.map(({ category }) => getTopStocksDataFromDB(category))
	);

	const topStocksDataPerUser = topStocksData.map((data, idx) => ({
		userId: categoryPerUser[idx].userId,
		category: categoryPerUser[idx].category,
		data
	}));

	topStocksDataPerUser.forEach(({ userId, category, data }) => {
		if (category === 'all') {
			topStocksCategories.forEach(cat => {
				io.to(userId).emit(topStockEventNames[cat], (data as TopStocks)[cat]);
			});
			return;
		}

		io.to(userId).emit(topStockEventNames[category], data as RealtimeData[]);
	});
}
