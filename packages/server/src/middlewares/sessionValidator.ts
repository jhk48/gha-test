import { Request, Response, NextFunction } from 'express';
import * as sessionService from '@services/session';

export default async function sessionValidator(
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> {
	try {
		const sessionId = req.cookies.uaat;
		const userId = await sessionService.checkSession(sessionId);
		if (userId === null) throw Error('Invalid session');

		res.locals.userId = userId;
		next();
	} catch (error) {
		next(error);
	}
}
