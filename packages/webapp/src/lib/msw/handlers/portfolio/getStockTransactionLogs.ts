import { RestRequest, PathParams, ResponseComposition, DefaultRequestBody, RestContext } from 'msw';
import { stockTransactionLogs } from '../../mockData/index';

export default function getStockTransactionLogs(
	req: RestRequest<never, PathParams>,
	res: ResponseComposition<DefaultRequestBody>,
	ctx: RestContext
) {
	return res(ctx.json(stockTransactionLogs));
}
