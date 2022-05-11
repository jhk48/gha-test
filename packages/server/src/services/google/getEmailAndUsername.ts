import axios, { AxiosError } from 'axios';
import logger from '@lib/winston';

interface GoogleUserEmailAndName {
	email: string;
	name: string;
}

export default async function getEmailAndUsername(
	accessToken: string
): Promise<GoogleUserEmailAndName> {
	const { data } = await axios.get(
		`https://www.googleapis.com/oauth2/v2/userinfo?fields=email,name&access_token=${accessToken}`
	);

	return data;
}
