import express, { Request, Response } from 'express';
import { sessionValidator, checkInitialLogin } from '@middlewares';

export default (): express.Router => {
	const router = express.Router();

	router.get(
		'/',
		checkInitialLogin,
		sessionValidator,
		async (req: Request, res: Response): Promise<void> => {
			res.json({ userId: res.locals.userId, isInitialLogin: res.locals.isInitialLogin });
		}
	);

	return router;
};
