import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import envConfig from '@config';

export default async function getAccessToken(code: string): Promise<string> {
	const {
		redirectBaseUrl,
		google: { clientId, clientSecret }
	} = envConfig.oauth;

	const reqConfig: AxiosRequestConfig = {
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	};

	const url = `https://oauth2.googleapis.com/token?client_id=${clientId}&client_secret=${clientSecret}&code=${code}&grant_type=authorization_code&redirect_uri=${redirectBaseUrl}/google/callback`;

	const {
		data: { access_token: accessToken }
	} = await axios.post(url, reqConfig);

	return accessToken as string;
}
