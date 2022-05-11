import { RestRequest, PathParams, ResponseComposition, DefaultRequestBody, RestContext } from 'msw';
import { editPortfolioPrivacyResult } from '../../mockData';

export default function editPortfolioPrivacy(
	req: RestRequest<never, PathParams>,
	res: ResponseComposition<DefaultRequestBody>,
	ctx: RestContext
) {
	return res(ctx.json({ modifiedPortfolio: editPortfolioPrivacyResult }));
}
