import { topStocksDataSubscribersRedisClient } from '@lib/index';
import { TopStockCategory } from '@portbullio/shared/src/types';

export default async function getTopStockCategoryPerUserFromDB() {
	try {
		const userIds = await topStocksDataSubscribersRedisClient.keys('*');
		const categoryPerUser = await Promise.all(
			userIds.map(userId => topStocksDataSubscribersRedisClient.get(userId))
		);

		return categoryPerUser.map((cat, idx) => ({
			userId: userIds[idx],
			category: JSON.parse(cat ?? '') as TopStockCategory
		}));
	} catch (error) {
		return [];
	}
}
