import { UserProfile } from '@portbullio/shared/src/types';
import { RestRequest, PathParams, ResponseComposition, DefaultRequestBody, RestContext } from 'msw';

interface EditUserProfileReqBody {
	username: string;
	bio: string;
	location: string;
}

export default function editUserProfile(
	req: RestRequest<never, PathParams>,
	res: ResponseComposition<DefaultRequestBody>,
	ctx: RestContext
) {
	const { username, bio, location } = req.body as unknown as EditUserProfileReqBody;

	const result: UserProfile = {
		username,
		email: 'admin@example.com',
		bio,
		location
	};
	return res(ctx.json(result));
}
