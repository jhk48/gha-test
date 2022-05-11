import { useQueryClient, useMutation } from 'react-query';
import { uploadAvatar } from '@api/user';

export default function useUpdateAvatar() {
	const queryClient = useQueryClient();

	return useMutation((avatarFile: File) => uploadAvatar(avatarFile), {
		onSuccess: newAvatarFileName => {
			queryClient.setQueryData('avatarUrl', newAvatarFileName);
		}
	});
}
