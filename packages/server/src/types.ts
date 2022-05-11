import { Application } from 'express';

export interface LoaderProps {
	app: Application;
}

export type AvatarMIMEType = 'image/jpg' | 'image/png' | 'image/jpeg' | 'image/webp';

export interface DailyAssetRecord {
	userId: number;
	portfolioId: number;
	totalAsset: number;
	totalDailyReturn: number;
}
