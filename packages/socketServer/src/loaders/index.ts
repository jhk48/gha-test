import { Server } from 'socket.io';
import dailySchedule from '@portbullio/library/src/dailySchedule';
import * as Lib from '@lib/index';
import {
	ServerToClientEvents,
	ClientToServerEvents,
	InterServerEvents,
	SocketData
} from '@portbullio/shared/src/types';
import * as Services from '@services/index';
import { MarketStatus } from '@types';
import listenSocketEvents from './listenSocketEvents';

const marketStatus: MarketStatus = { isMarketOpen: false };

export default async function appLoader(
	io: Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>
) {
	await Lib.marketStatusRedisClient.connect();
	await Lib.realtimeStockDataSubscribersRedisClient.connect();
	await Lib.stockOverviewPageDataSubscribersRedisClient.connect();
	await Lib.majorIndicesDataSubscribersRedisClient.connect();
	await Lib.topStocksDataSubscribersRedisClient.connect();
	await Lib.realtimeStockDataRedisClient.connect();
	await Lib.majorIndicesDataRedisClient.connect();
	await Lib.topStocksDataRedisClient.connect();

	await Lib.realtimeStockDataSubscribersRedisClient.flushDb();
	await Lib.majorIndicesDataSubscribersRedisClient.flushDb();
	await Lib.stockOverviewPageDataSubscribersRedisClient.flushDb();
	await Lib.topStocksDataSubscribersRedisClient.flushDb();

	marketStatus.isMarketOpen = await Services.getCurrentMarketState();

	dailySchedule('22:30:00', async () => {
		const isMarketOpenNow = await Services.fetchIsMarketOpen();
		await Lib.marketStatusRedisClient.set('isMarketOpen', String(isMarketOpenNow));
		marketStatus.isMarketOpen = isMarketOpenNow;
		Lib.logger.info(`Checked Market Status. Current state: ${isMarketOpenNow ? 'open' : 'close'}`);
		if (marketStatus.isMarketOpen) Services.updatePrice(marketStatus);
	});

	dailySchedule('05:00:00', async () => {
		await Lib.marketStatusRedisClient.set('isMarketOpen', 'false');
		marketStatus.isMarketOpen = false;
		Lib.logger.info(`Modified market status to 'closed'`);
	});

	Lib.marketStatusRedisClient.on('error', err =>
		Lib.logger.error('Market Status Redis Client Error', err)
	);
	Lib.realtimeStockDataSubscribersRedisClient.on('error', err =>
		Lib.logger.error('Realtime Stock Data Subscribers Redis Client Error', err)
	);
	Lib.stockOverviewPageDataSubscribersRedisClient.on('error', err =>
		Lib.logger.error('Stock Overview Page Data Subscribers Redis Client Error', err)
	);
	Lib.majorIndicesDataSubscribersRedisClient.on('error', err =>
		Lib.logger.error('Major Indices Data Subscribers Redis Client Error', err)
	);
	Lib.topStocksDataSubscribersRedisClient.on('error', err =>
		Lib.logger.error('Top Stocks Data Subscribers Client Error', err)
	);
	Lib.realtimeStockDataRedisClient.on('error', err =>
		Lib.logger.error('Realtime Stock Data Redis Client Error', err)
	);
	Lib.majorIndicesDataRedisClient.on('error', err =>
		Lib.logger.error('Major Indices Data Redis Client Error', err)
	);
	Lib.topStocksDataRedisClient.on('error', err =>
		Lib.logger.error('Top Stocks Data Redis Client Error', err)
	);

	listenSocketEvents(io);
	if (marketStatus.isMarketOpen) Services.updatePrice(marketStatus);

	Lib.Emitter.on('BROADCAST_REALTIME_DATA', () => Services.broadcastRealtimeData(io));
	Lib.Emitter.on('BROADCAST_STOCK_OVERVIEW_DATA', realtimeData =>
		Services.broadcastStockOverviewData(io, realtimeData)
	);
	Lib.Emitter.on('BROADCAST_MAJOR_INDICES_DATA', majorIndicesData =>
		Services.broadcastMajorIndicesData(io, majorIndicesData)
	);
	Lib.Emitter.on('BROADCAST_TOP_STOCKS_DATA', () => Services.broadcastTopStocksData(io));
}
