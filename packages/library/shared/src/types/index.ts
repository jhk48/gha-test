export interface Holding {
	ticker: string;
	avgCost: number;
	buyQuantity: number;
	sellQuantity: number;
}

export interface RealtimeDataProperties {
	price: number;
	change: number;
	changePercent: number;
	open: number | null;
	prevClose: number;
	high: number | null;
	low: number | null;
	marketCap: number;
	volume: number;
	week52High: number;
	week52Low: number;
	peRatio: number | null;
}

export interface RealtimeData extends RealtimeDataProperties {
	ticker: string;
}

export interface ClientStockRealtimeData {
	[key: string]: RealtimeDataProperties;
}

export interface ServerToClientEvents {
	REALTIME_DATA: (data: ClientStockRealtimeData) => void;
	CACHED_DATA: (data: ClientStockRealtimeData) => void;
	MAJOR_INDICES_DATA: (data: MajorIndices) => void;
	STOCK_OVERVIEW_DATA: (data: RealtimeDataProperties) => void;
	TOP_ACTIVES_DATA: (data: TopActives) => void;
	TOP_GAINERS_DATA: (data: TopGainers) => void;
	TOP_LOSERS_DATA: (data: TopLosers) => void;
}

export interface ClientToServerEvents {
	SUBSCRIBE_TICKER: (tickers: string[]) => void;
	SUBSCRIBE_MAJOR_INDICES_DATA: () => void;
	SUBSCRIBE_TOP_STOCKS_DATA: (category: TopStockCategory) => void;
	SUBSCRIBE_STOCK_OVERVIEW_DATA: (ticker: string) => void;
	UNSUBSCRIBE_TICKER: () => void;
	UNSUBSCRIBE_MAJOR_INDICES_DATA: () => void;
	UNSUBSCRIBE_TOP_STOCKS_DATA: () => void;
	UNSUBSCRIBE_STOCK_OVERVIEW_DATA: () => void;
	REQ_CACHED_DATA: (tickers: string[]) => void;
	REQ_MAJOR_INDICES_DATA: () => void;
	REQ_ALL_TOP_STOCKS_DATA: () => void;
	REQ_TOP_ACTIVES_DATA: () => void;
	REQ_TOP_GAINERS_DATA: () => void;
	REQ_TOP_LOSERS_DATA: () => void;
	REQ_STOCK_OVERVIEW_DATA: (ticker: string) => void;
}

export interface InterServerEvents {}

export interface SocketData {}

export interface MajorIndexData {
	ticker: string;
	price: number;
	change: number;
	changePercent: number;
}

export interface MajorIndices {
	DJI: MajorIndexData;
	GSPC: MajorIndexData;
	IXIC: MajorIndexData;
}

export interface TopStockData {
	ticker: string;
	price: number;
	change: number;
	changePercent: number;
}

export type TopActives = TopStockData[];
export type TopGainers = TopStockData[];
export type TopLosers = TopStockData[];

export interface TopStocks {
	actives: TopActives;
	gainers: TopGainers;
	losers: TopLosers;
}

export type TopStockCategory = 'all' | 'actives' | 'gainers' | 'losers';

export interface UserProfile {
	username: string;
	email: string;
	bio: string | null;
	location: string | null;
}
