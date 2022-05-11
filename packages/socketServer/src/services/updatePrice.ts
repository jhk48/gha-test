import { TopStocks } from '@portbullio/shared/src/types';
import Emitter from '@lib/eventEmitter';
import * as Services from '@services/index';
import { MarketStatus } from '@types';
import { MAX_NUM_OF_REQ_TICKERS } from '@constants';

const REQUEST_PRICE_INTERVAL = 5000;

export default async function updatePrice(marketStatus: MarketStatus) {
	if (!marketStatus.isMarketOpen) return;
	const majorIndicesData = await Services.fetchMajorIndicesData();
	const allTopStocksData = await Services.fetchTopStocks('all');

	const tickers = Services.groupTickersBy(
		MAX_NUM_OF_REQ_TICKERS,
		await Services.getAllUsersTickersFromDB()
	);
	const realtimeRawData = await Services.fetchRealtimeData(tickers);
	const realtimeData = Services.transformRawStockData(realtimeRawData);

	if (majorIndicesData) await Services.saveMajorIndicesDataIntoDB(majorIndicesData);
	if (realtimeData) await Services.saveRealtimeDataIntoDB(realtimeData);
	if (allTopStocksData) await Services.saveTopStocksDataIntoDB(allTopStocksData as TopStocks);

	if (realtimeData) {
		Emitter.emit('BROADCAST_REALTIME_DATA');
		Emitter.emit('BROADCAST_STOCK_OVERVIEW_DATA', realtimeData);
	}
	if (majorIndicesData) Emitter.emit('BROADCAST_MAJOR_INDICES_DATA', majorIndicesData);
	if (allTopStocksData) Emitter.emit('BROADCAST_TOP_STOCKS_DATA');

	setTimeout(updatePrice, REQUEST_PRICE_INTERVAL, marketStatus);
}
