import { useQueryClient, useMutation } from 'react-query';
import { deleteAvatar } from '@api/user';

export default function useDeleteAvatar() {
	const queryClient = useQueryClient();

	return useMutation(deleteAvatar, {
		onSuccess: () => {
			queryClient.setQueryData('avatarUrl', null);
		}
	});
}
