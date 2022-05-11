import { Request, Response, NextFunction } from 'express';
import { sessionService, cookieService } from '@services/index';

export default async function checkInitialLogin(
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> {
	try {
		const sessionId = req.cookies.login_token;
		if (sessionId === undefined) {
			res.locals.isInitialLogin = false;
			next();
			return;
		}

		cookieService.expireCookie(res, 'login_token');
		const userId = await sessionService.checkSession(sessionId);
		if (userId === undefined) {
			res.locals.isInitialLogin = false;
			next();
			return;
		}

		res.locals.isInitialLogin = true;
		next();
	} catch (error) {
		next(error);
	}
}
