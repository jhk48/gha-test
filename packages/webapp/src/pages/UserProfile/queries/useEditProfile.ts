import { useQueryClient, useMutation } from 'react-query';
import { userKeys } from '@lib/index';
import { editUserProfile, EditUserProfileArgs } from '@api/user';

export default function useEditProfile() {
	const queryClient = useQueryClient();

	return useMutation(
		({ username, bio, location }: EditUserProfileArgs) =>
			editUserProfile({ username, bio, location }),
		{
			onSuccess: updatedPortfolio => {
				queryClient.setQueryData(userKeys.profile, updatedPortfolio);
			}
		}
	);
}
