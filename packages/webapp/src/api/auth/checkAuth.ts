import axios from 'axios';
import envConfig from '@configs/env';

interface CheckAuthResponse {
	data: {
		userId: number | undefined;
		isInitialLogin: boolean;
	};
}

interface CheckAuthReturnType {
	userId: number | undefined;
	isInitialLogin: boolean;
}

export default async function checkAuth(): Promise<CheckAuthReturnType> {
	const { apiServerUrl } = envConfig;
	try {
		const {
			data: { userId, isInitialLogin }
		}: CheckAuthResponse = await axios.get(`${apiServerUrl}/auth/check`, {
			withCredentials: true
		});

		return {
			userId,
			isInitialLogin
		};
	} catch (error) {
		return {
			userId: undefined,
			isInitialLogin: false
		};
	}
}
