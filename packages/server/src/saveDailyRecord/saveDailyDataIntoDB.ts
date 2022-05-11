import { prisma, logger } from '@lib/index';
import { DailyAssetRecord } from '@prisma/client';

export default async function saveDailyDataIntoDB(
	data: Pick<DailyAssetRecord, 'userId' | 'portfolioId' | 'totalAsset' | 'dailyReturn'>
) {
	try {
		await prisma.dailyAssetRecord.create({ data });
	} catch (error) {
		logger.error(`saving data into db error: ${error}`);
	}
}
