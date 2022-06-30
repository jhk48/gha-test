import { Response, CookieOptions } from 'express';
import envConfig from '@config';

interface IssueCookieArgs {
	res: Response;
	name: string;
	value: string;
	options?: CookieOptions;
}

export default function issueCookie({ res, name, value, options }: IssueCookieArgs) {
	res.cookie(name, value, {
		domain: envConfig.cookieDomain,
		httpOnly: true,
		sameSite: 'strict',
		secure: true,
		...options
	});
}
