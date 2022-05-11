import { useQuery } from 'react-query';
import { userKeys } from '@lib/index';
import { getUserProfile } from '@api/user';

export default function useUserProfile() {
	return useQuery(userKeys.profile, getUserProfile, { staleTime: Infinity });
}
