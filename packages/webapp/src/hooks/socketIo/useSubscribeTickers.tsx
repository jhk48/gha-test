import { useEffect } from 'react';
import { useEmitter } from '@hooks/index';
import { useSelectedPortfolioId } from '@components/index';
import { getHoldingsTickers } from '@utils';
import { useRealtimeData } from '../realtimeData';
import { useHoldingsList } from '../ReactQuery';
import { useSocketIo } from './useSocketIo';

export default function useSubscribeTickers() {
	const Emitter = useEmitter();
	const realtimeDataStore = useRealtimeData();
	const socket = useSocketIo();
	const portfolioId = useSelectedPortfolioId();
	const tickers = getHoldingsTickers(useHoldingsList(portfolioId).data ?? []);
	const cachedTickers = new Set(Object.keys(realtimeDataStore));
	const notCachedTickers = tickers.filter(ticker => !cachedTickers.has(ticker));

	useEffect(() => {
		if (tickers.length === 0) return;
		if (notCachedTickers.length === 0) return;
		socket.emit('SUBSCRIBE_TICKER', tickers);
		socket.emit('REQ_CACHED_DATA', notCachedTickers);
	}, [socket, notCachedTickers, tickers]);

	useEffect(() => {
		function evtListener() {
			if (document.visibilityState === 'hidden') {
				socket.emit('UNSUBSCRIBE_TICKER');
			} else {
				socket.emit('SUBSCRIBE_TICKER', tickers);
			}
		}

		document.addEventListener('visibilitychange', evtListener);

		return () => {
			document.removeEventListener('visibilitychange', evtListener);
		};
	}, [socket, tickers]);

	useEffect(() => {
		function evtListener() {
			socket.emit('UNSUBSCRIBE_TICKER');
			socket.emit('UNSUBSCRIBE_TOP_STOCKS_DATA');
		}

		Emitter.on('LOG_OUT', evtListener);

		return () => {
			Emitter.off('LOG_OUT', evtListener);
		};
	}, [socket, Emitter]);
}
