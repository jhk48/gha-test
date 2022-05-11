import { RestRequest, PathParams, ResponseComposition, DefaultRequestBody, RestContext } from 'msw';

export default function getCompanyName(
	req: RestRequest<never, PathParams>,
	res: ResponseComposition<DefaultRequestBody>,
	ctx: RestContext
) {
	const ticker = req.url.searchParams.get('search');
	if (!ticker) {
		return res(ctx.json({ message: `'search' query param is missing.` }));
	}

	if (ticker.toUpperCase() === 'AAPL') return res(ctx.json('Apple Inc'));
	if (ticker.toUpperCase() === 'TSLA') return res(ctx.json('Tesla Inc'));
	return res(ctx.json({ message: 'Cannot find company name' }));
}
