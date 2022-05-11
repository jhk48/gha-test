import { Server } from 'socket.io';
import {
	ServerToClientEvents,
	ClientToServerEvents,
	InterServerEvents,
	SocketData
} from '@portbullio/shared/src/types';
import * as Services from '@services/index';

export default function listenSocketEvents(
	io: Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>
) {
	io.on('connect', socket => {
		socket.on('SUBSCRIBE_TICKER', tickers => Services.subscribeRealtimeData(socket.id, tickers));
		socket.on('SUBSCRIBE_MAJOR_INDICES_DATA', () => Services.subscribeMajorIndicesData(socket.id));
		socket.on('SUBSCRIBE_TOP_STOCKS_DATA', category =>
			Services.subscribeTopStocksData(socket.id, category)
		);
		socket.on('SUBSCRIBE_STOCK_OVERVIEW_DATA', ticker =>
			Services.subscribeStockOverviewData(socket.id, ticker)
		);

		socket.on('UNSUBSCRIBE_TICKER', () => Services.unsubscribeRealtimeData(socket.id));
		socket.on('UNSUBSCRIBE_MAJOR_INDICES_DATA', () =>
			Services.unsubscribeMajorIndicesData(socket.id)
		);
		socket.on('UNSUBSCRIBE_TOP_STOCKS_DATA', () => Services.unsubscribeTopStocksData(socket.id));
		socket.on('UNSUBSCRIBE_STOCK_OVERVIEW_DATA', () =>
			Services.unsubscribeStockOverviewData(socket.id)
		);

		socket.on('REQ_CACHED_DATA', tickers => Services.emitCachedData(io, socket.id, tickers));
		socket.on('REQ_STOCK_OVERVIEW_DATA', ticker =>
			Services.emitStockOverviewData(io, socket.id, ticker)
		);
		socket.on('REQ_MAJOR_INDICES_DATA', () => Services.emitMajorIndicesData(io, socket.id));
		socket.on('REQ_ALL_TOP_STOCKS_DATA', () => Services.emitTopStocksData(io, socket.id, 'all'));
		socket.on('REQ_TOP_ACTIVES_DATA', () => Services.emitTopStocksData(io, socket.id, 'actives'));
		socket.on('REQ_TOP_GAINERS_DATA', () => Services.emitTopStocksData(io, socket.id, 'gainers'));
		socket.on('REQ_TOP_LOSERS_DATA', () => Services.emitTopStocksData(io, socket.id, 'losers'));

		socket.on('disconnect', () => {
			Services.unsubscribeRealtimeData(socket.id);
			Services.unsubscribeMajorIndicesData(socket.id);
			Services.unsubscribeMajorIndicesData(socket.id);
		});
	});
}
