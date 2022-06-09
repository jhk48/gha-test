import { Response } from 'express';

export default function expireCookie(res: Response, cookieName: string): void {
	res.cookie(cookieName, '', {
		domain: '.por',
		httpOnly: true,
		sameSite: 'strict',
		secure: true,
		maxAge: -1
	});
}
