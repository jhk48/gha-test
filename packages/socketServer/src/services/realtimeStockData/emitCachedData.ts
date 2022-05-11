import { Server } from 'socket.io';
import {
	ServerToClientEvents,
	ClientToServerEvents,
	InterServerEvents,
	SocketData
} from '@portbullio/shared/src/types';
import { realtimeStockDataRedisClient } from '@lib/index';
import { MAX_NUM_OF_REQ_TICKERS } from '@constants';
import groupTickersBy from './groupTickersBy';
import fetchRealtimeData from './fetchRealtimeData';
import transformRawStockData from './transformRawStockData';
import saveRealtimeDataIntoDB from '../saveRealtimeDataIntoDB';
import getRealtimeDataFromDB from './getRealtimeDataFromDB';
import formatRealtimeDataToEmit from './formatRealtimeDataToEmit';

export default async function emitCachedData(
	io: Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>,
	userId: string,
	userTickers: string[]
) {
	const cachedTickers = new Set(await realtimeStockDataRedisClient.keys('*'));
	const notCachedTickers = userTickers.filter(ticker => !cachedTickers.has(ticker));

	if (notCachedTickers.length > 0) {
		const tickers = groupTickersBy(MAX_NUM_OF_REQ_TICKERS, notCachedTickers);
		const cachedRawData = await fetchRealtimeData(tickers);
		const cachedData = transformRawStockData(cachedRawData);
		if (!cachedData) return;

		await saveRealtimeDataIntoDB(cachedData);
	}

	const result = await getRealtimeDataFromDB(userTickers);
	io.to(userId).emit('CACHED_DATA', formatRealtimeDataToEmit(result));
}
