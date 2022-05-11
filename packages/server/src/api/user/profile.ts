import express, { NextFunction, Request, Response } from 'express';
import * as userService from '@services/user';
import { sessionValidator } from '@middlewares';

interface EditUserProfileReqBody {
	username: string;
	bio: string | null;
	location: string | null;
}

export default (): express.Router => {
	const router = express.Router();

	router.get('/', sessionValidator, async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { userId } = res.locals;
			const data = await userService.getUserInfo(Number(userId));
			res.status(200).json(data);
		} catch (error) {
			next(error);
		}
	});

	router.put('/', sessionValidator, async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { userId } = res.locals;
			const { username, bio, location } = req.body as unknown as EditUserProfileReqBody;

			const modifiedProfile = await userService.editUserProfile({
				userId: Number(userId),
				username,
				bio,
				location
			});
			res.json(modifiedProfile);
		} catch (error) {
			next(error);
		}
	});

	return router;
};
