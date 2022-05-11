import { RestRequest, PathParams, ResponseComposition, DefaultRequestBody, RestContext } from 'msw';
import {
	fakeGetSectorsResultCase1,
	fakeGetSectorsResultCase2,
	fakeGetSectorsResultCase3
} from '../../mockData/stock';

export default function getSectors(
	req: RestRequest<never, PathParams>,
	res: ResponseComposition<DefaultRequestBody>,
	ctx: RestContext
) {
	const search = req.url.searchParams.get('search');
	if (!search) {
		return res(ctx.json({ message: `'search' query param is missing.` }));
	}
	const tickers = JSON.parse(decodeURIComponent(search));

	if (tickers.length === 1) {
		if (tickers[0] === '') return res(ctx.json([]));

		if (tickers[0] === 'AAPL') return res(ctx.json(fakeGetSectorsResultCase1));

		return res(ctx.json(fakeGetSectorsResultCase2));
	}

	return res(ctx.json(fakeGetSectorsResultCase3));
}
