import { RestRequest, PathParams, ResponseComposition, DefaultRequestBody, RestContext } from 'msw';
import { fakeSearchTickerResultCase1, fakeSearchTickerResultCase2 } from '../../mockData/stock';

export default function searchTickers(
	req: RestRequest<never, PathParams>,
	res: ResponseComposition<DefaultRequestBody>,
	ctx: RestContext
) {
	const ticker = req.url.searchParams.get('search');
	if (!ticker) {
		return res(ctx.json({ message: `'search' query param is missing.` }));
	}

	if (ticker.toUpperCase() === 'AAPL') return res(ctx.json(fakeSearchTickerResultCase1));
	if (ticker.toUpperCase() === 'TSLA') return res(ctx.json(fakeSearchTickerResultCase2));
	return res(ctx.json([]));
}
