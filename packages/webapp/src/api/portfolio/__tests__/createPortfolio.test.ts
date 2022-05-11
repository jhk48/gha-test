import { createPortfolioResult } from '@lib/msw';
import { createPortfolio } from '../createPortfolio';

test('createPortfolio test', async () => {
	const result = await createPortfolio({ portfolioName: 'test', privacy: 'public' });
	expect(result).toStrictEqual(createPortfolioResult);
});
