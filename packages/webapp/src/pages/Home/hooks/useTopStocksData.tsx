import { useEffect } from 'react';
import { TopActives, TopGainers, TopLosers } from '@portbullio/shared/src/types';
import { useSocketIo } from '@hooks/index';
import * as TopStocksContext from '../context';

interface TopStocksDataHookReturnValue {
	topActives: TopActives | undefined;
	topGainers: TopGainers | undefined;
	topLosers: TopLosers | undefined;
}

export default function useTopStocksData(): TopStocksDataHookReturnValue {
	const socket = useSocketIo();
	const topActives = TopStocksContext.useTopActives();
	const setTopActives = TopStocksContext.useTopActivesUpdate();

	const topGainers = TopStocksContext.useTopGainers();
	const setTopGainers = TopStocksContext.useTopGainersUpdate();

	const topLosers = TopStocksContext.useTopLosers();
	const setTopLosers = TopStocksContext.useTopLosersUpdate();

	useEffect(() => {
		let shouldCancel = false;
		socket.emit('REQ_ALL_TOP_STOCKS_DATA');
		socket.emit('SUBSCRIBE_TOP_STOCKS_DATA', 'all');
		socket.on('TOP_ACTIVES_DATA', data => {
			if (shouldCancel) return;
			setTopActives(data);
		});
		socket.on('TOP_GAINERS_DATA', data => {
			if (shouldCancel) return;
			setTopGainers(data);
		});
		socket.on('TOP_LOSERS_DATA', data => {
			if (shouldCancel) return;
			setTopLosers(data);
		});

		return () => {
			shouldCancel = true;
			socket.emit('UNSUBSCRIBE_TOP_STOCKS_DATA');
		};
	}, [socket, setTopActives, setTopGainers, setTopLosers]);

	return { topActives, topGainers, topLosers };
}
