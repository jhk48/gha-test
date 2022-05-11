import { RestRequest, PathParams, ResponseComposition, DefaultRequestBody, RestContext } from 'msw';

export default function getExchangeName(
	req: RestRequest<never, PathParams>,
	res: ResponseComposition<DefaultRequestBody>,
	ctx: RestContext
) {
	const ticker = req.url.searchParams.get('search');
	if (!ticker) {
		return res(ctx.json({ message: `'search' query param is missing.` }));
	}

	if (ticker.toUpperCase() === 'AAPL') return res(ctx.json('Nasdaq'));
	if (ticker.toUpperCase() === 'BA') return res(ctx.json('NYSE'));
	if (ticker.toUpperCase() === 'AAMC') return res(ctx.json('AMEX'));
	if (ticker.toUpperCase() === 'AAAU') return res(ctx.json('BATS'));
	if (ticker.toUpperCase() === 'AAA') return res(ctx.json('NYSEArca'));
	if (ticker.toUpperCase() === 'FOTXY') return res(ctx.json('OTC'));
	return res(ctx.json({ message: 'Cannot find exchange name' }));
}
