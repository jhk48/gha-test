import { RestRequest, PathParams, ResponseComposition, DefaultRequestBody, RestContext } from 'msw';
import { createPortfolioResult } from '../../mockData/index';

export default function createPortfolio(
	req: RestRequest<never, PathParams>,
	res: ResponseComposition<DefaultRequestBody>,
	ctx: RestContext
) {
	return res(ctx.json({ newPortfolio: createPortfolioResult }));
}
