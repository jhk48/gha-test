import axios from 'axios';
import envConfig from '@configs/env';

export default async function logOut(): Promise<boolean> {
	const { apiServerUrl } = envConfig;

	try {
		await axios.delete(`${apiServerUrl}/auth/logout`, {
			withCredentials: true
		});
		return true;
	} catch (error) {
		return false;
	}
}
