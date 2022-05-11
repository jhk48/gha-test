import axios from 'axios';
import envConfig from '@configs/env';

export default async function deleteAvatar() {
	const { apiServerUrl } = envConfig;

	const config = {
		withCredentials: true
	};

	await axios.delete(`${apiServerUrl}/user/avatar`, config);
}
