import { Response } from 'express';
import envConfig from '@config';

export default function expireCookie(res: Response, cookieName: string): void {
	res.cookie(cookieName, '', {
		domain: envConfig.cookieDomain,
		httpOnly: true,
		sameSite: 'strict',
		secure: true,
		maxAge: -1
	});
}
