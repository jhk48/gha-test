import { SyntheticEvent } from 'react';

export type Theme = 'light' | 'dark';
export type CloseModalFn = (e: SyntheticEvent, stopBubble?: boolean) => void;

export interface IconProps {
	width?: number;
	height?: number;
	fill?: string;
}

export interface VerticalScrollBarThumbProps {
	height: number;
}

export interface HorizontalScrollBarThumbProps {
	width: number;
}

type StockType = 'ad' | 'cs' | 'et' | 'ps' | 'rt' | 'struct' | 'ut' | 'wt';

export interface SearchSymbolItem {
	ticker: string;
	exchange: string;
	name: string;
	type: StockType;
}

export interface HoldingsRatio {
	ticker: string;
	ratio: number;
	value: number;
}

export interface BarGeometry {
	x: number;
	y: number;
	width: number;
	height: number;
	ticker: string;
	ratio: number;
	value: number;
}

export interface HoldingsValues {
	ticker: string;
	value: number;
}

export interface SectorInfo {
	ticker: string;
	sector: string;
}

export interface SectorPieChartRatio {
	sector: string;
	ratio: number;
	includedStocks: string[];
}

export interface AssetChartData {
	id: number;
	userId: number;
	portfolioId: number;
	totalAsset: number;
	dailyReturn: number;
	createdAt: string;
}
