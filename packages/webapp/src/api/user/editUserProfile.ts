import axios, { AxiosRequestConfig } from 'axios';
import { UserProfile } from '@portbullio/shared/src/types';
import envConfig from '@configs/env';

export interface EditUserProfileArgs {
	username: string;
	bio: string | null;
	location: string | null;
}

interface EditPortfolioNameRes {
	data: UserProfile;
}

export async function editUserProfile({ username, bio, location }: EditUserProfileArgs) {
	if (username.trim() === '') throw new Error('Invalid username');
	const { apiServerUrl } = envConfig;

	const config: AxiosRequestConfig = {
		headers: {
			'Content-Type': 'application/json'
		},
		withCredentials: true
	};

	const formData = JSON.stringify({ username, bio, location });
	const { data }: EditPortfolioNameRes = await axios.put(
		`${apiServerUrl}/user/profile`,
		formData,
		config
	);
	return data;
}
