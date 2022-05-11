import { editPortfolioPrivacyResult } from '@lib/msw';
import { editPortfolioPrivacy } from '../editPortfolioPrivacy';

test('editPortfolioPrivacy test', async () => {
	const result = await editPortfolioPrivacy({ portfolioId: 1, newPrivacy: 'private' });
	expect(result).toStrictEqual(editPortfolioPrivacyResult);
});
