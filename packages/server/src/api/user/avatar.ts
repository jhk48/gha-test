import express, { NextFunction, Request, Response } from 'express';
import * as userService from '@services/user';
import { sessionValidator, multerForAvatar } from '@middlewares';
import { AvatarMIMEType } from '@types';

export default (): express.Router => {
	const router = express.Router();

	router.get('/', sessionValidator, async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { userId } = res.locals;
			const avatarURL = await userService.getAvatar(Number(userId));
			res.status(200).json({ avatarURL });
		} catch (error) {
			next(error);
		}
	});

	router.put(
		'/',
		sessionValidator,
		multerForAvatar.single('avatar'),
		async (req: Request, res: Response, next: NextFunction) => {
			try {
				const { userId } = res.locals;
				const avatarData = req.file?.buffer as unknown as string;
				const uploadedFileName = await userService.updateAvatar(
					req.file?.mimetype as AvatarMIMEType,
					Number(userId),
					avatarData
				);
				res.json({ uploadedFileName });
			} catch (error) {
				next(error);
			}
		}
	);

	router.delete('/', sessionValidator, async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { userId } = res.locals;
			await userService.deleteAvatar(Number(userId));
			res.status(200).send();
		} catch (error) {
			next(error);
		}
	});

	return router;
};
