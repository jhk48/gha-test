import { useEffect, useState } from 'react';
import { RealtimeDataProperties } from '@portbullio/shared/src/types';
import { useEmitter } from '@hooks/index';
import { useSocketIo } from '@hooks/socketIo';

export default function useStockOverviewData(ticker: string) {
	const Emitter = useEmitter();
	const socket = useSocketIo();
	const [stockOverviewData, setStockOverviewData] = useState<RealtimeDataProperties>();

	useEffect(() => {
		socket.emit('SUBSCRIBE_STOCK_OVERVIEW_DATA', ticker);
		socket.emit('REQ_STOCK_OVERVIEW_DATA', ticker);

		return () => {
			socket.emit('UNSUBSCRIBE_STOCK_OVERVIEW_DATA');
		};
	}, [socket, ticker]);

	useEffect(() => {
		let shouldCancel = false;
		socket.on('STOCK_OVERVIEW_DATA', data => {
			if (shouldCancel) return;
			setStockOverviewData(data);
		});

		return () => {
			shouldCancel = true;
		};
	}, [socket]);

	useEffect(() => {
		function evtListener() {
			if (document.visibilityState === 'hidden') {
				socket.emit('UNSUBSCRIBE_STOCK_OVERVIEW_DATA');
			} else {
				socket.emit('SUBSCRIBE_STOCK_OVERVIEW_DATA', ticker);
			}
		}

		document.addEventListener('visibilitychange', evtListener);

		return () => {
			document.removeEventListener('visibilitychange', evtListener);
		};
	}, [socket, ticker]);

	useEffect(() => {
		function evtListener() {
			socket.emit('UNSUBSCRIBE_STOCK_OVERVIEW_DATA');
			socket.emit('UNSUBSCRIBE_TOP_STOCKS_DATA');
		}

		Emitter.on('LOG_OUT', evtListener);

		return () => {
			Emitter.off('LOG_OUT', evtListener);
		};
	}, [socket, Emitter]);

	return stockOverviewData;
}
