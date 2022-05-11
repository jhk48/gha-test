import { RestRequest, PathParams, ResponseComposition, DefaultRequestBody, RestContext } from 'msw';

export default function getAvatar(
	req: RestRequest<never, PathParams>,
	res: ResponseComposition<DefaultRequestBody>,
	ctx: RestContext
) {
	return res(ctx.json({ avatarURL: 'test-image.png' }));
}
