import axios from 'axios';
import envConfig from '@configs/env';

interface UploadAvatarRes {
	data: {
		uploadedFileName: string;
	};
}

export default async function uploadAvatar(avatarFile: File) {
	const { apiServerUrl } = envConfig;

	const config = {
		headers: {
			'Content-Type': 'multipart/form-data'
		},
		withCredentials: true
	};
	const avatarData = new FormData();
	avatarData.append('avatar', avatarFile);

	const { data }: UploadAvatarRes = await axios.put(
		`${apiServerUrl}/user/avatar`,
		avatarData,
		config
	);
	return data.uploadedFileName;
}
