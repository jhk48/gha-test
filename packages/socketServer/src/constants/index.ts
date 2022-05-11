export const MAX_NUM_OF_REQ_TICKERS = 100;
export const topStocksCategories = ['actives', 'gainers', 'losers'] as const;
export const topStockEventNames = {
	actives: 'TOP_ACTIVES_DATA',
	gainers: 'TOP_GAINERS_DATA',
	losers: 'TOP_LOSERS_DATA'
} as const;
