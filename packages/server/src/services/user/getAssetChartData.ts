import { DailyAssetRecord } from '@prisma/client';
import prisma from '@lib/prisma';

interface GetAssetChartDataParam {
	userId: number;
	portfolioId: number;
	startDate: Date;
	count: number;
}

export default async function getAssetChartData({
	userId,
	portfolioId,
	startDate,
	count
}: GetAssetChartDataParam): Promise<DailyAssetRecord[]> {
	const data = await prisma.dailyAssetRecord.findMany({
		where: {
			userId,
			portfolioId,
			createdAt: { lt: startDate }
		},
		orderBy: { createdAt: 'desc' },
		take: count
	});

	return data;
}
