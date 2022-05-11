import { RestRequest, PathParams, ResponseComposition, DefaultRequestBody, RestContext } from 'msw';
import { editPortfolioNameResult } from '../../mockData';

export default function editPortfolioName(
	req: RestRequest<never, PathParams>,
	res: ResponseComposition<DefaultRequestBody>,
	ctx: RestContext
) {
	return res(ctx.json({ modifiedPortfolio: editPortfolioNameResult }));
}
