import express, { NextFunction, Request, Response } from 'express';
import { sessionService, cookieService } from '@services/index';
import { sessionValidator } from '@middlewares';

export default (): express.Router => {
	const router = express.Router();

	router.delete('/', sessionValidator, async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { uaat } = req.cookies;
			await sessionService.deleteSession(uaat);
			cookieService.expireCookie(res, 'uaat');
			res.send();
		} catch (error) {
			next(error);
		}
	});

	return router;
};
