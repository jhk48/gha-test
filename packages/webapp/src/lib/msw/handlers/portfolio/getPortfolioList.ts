import { RestRequest, PathParams, ResponseComposition, DefaultRequestBody, RestContext } from 'msw';
import { portfolios } from '../../mockData/index';

export default function getPortfolioList(
	req: RestRequest<never, PathParams>,
	res: ResponseComposition<DefaultRequestBody>,
	ctx: RestContext
) {
	return res(ctx.json({ portfolios }));
}
