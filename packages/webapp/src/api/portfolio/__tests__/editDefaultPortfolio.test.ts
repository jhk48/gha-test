import { editDefaultPortfolio } from '../editDefaultPortfolio';

test('editDefaultPortfolio test', async () => {
	const result = await editDefaultPortfolio({ prevPortfolioId: 1, newPortfolioId: 2 });
	expect(result).toBe(2);
});
