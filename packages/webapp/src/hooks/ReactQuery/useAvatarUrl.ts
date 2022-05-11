import { useQuery } from 'react-query';
import { avatarKeys } from '@lib/index';
import { getAvatar } from '@api/user';

export default function useAvatarUrl() {
	return useQuery(avatarKeys.url, getAvatar, { staleTime: Infinity });
}
