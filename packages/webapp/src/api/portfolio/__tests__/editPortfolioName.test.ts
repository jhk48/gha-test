import { editPortfolioNameResult } from '@lib/msw';
import { editPortfolioName } from '../editPortfolioName';

test('editPortfolioName test', async () => {
	const result = await editPortfolioName({ portfolioId: 1, newPortfolioName: 'test' });
	expect(result).toStrictEqual(editPortfolioNameResult);
});
