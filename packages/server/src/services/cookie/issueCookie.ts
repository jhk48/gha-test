import { Response, CookieOptions } from 'express';

interface IssueCookieArgs {
	res: Response;
	name: string;
	value: string;
	options?: CookieOptions;
}

export default function issueCookie({ res, name, value, options }: IssueCookieArgs) {
	res.cookie(name, value, {
		httpOnly: true,
		sameSite: 'strict',
		secure: true,
		...options
	});
}
