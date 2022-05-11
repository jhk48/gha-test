import { deletePortfolio } from '../deletePortfolio';

test('deletePortfolio test', async () => {
	const result = await deletePortfolio({ portfolioId: 1, isDefaultPortfolio: false });
	expect(result).toBe(1);
});
