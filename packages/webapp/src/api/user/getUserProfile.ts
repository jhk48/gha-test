import axios from 'axios';
import { UserProfile } from '@portbullio/shared/src/types';
import envConfig from '@configs/env';

interface GetUserProfileRes {
	data: UserProfile;
}

export default async function getUserProfile() {
	const { apiServerUrl } = envConfig;
	try {
		const { data }: GetUserProfileRes = await axios.get(`${apiServerUrl}/user/profile`, {
			withCredentials: true
		});

		return data;
	} catch (error) {
		return null;
	}
}
