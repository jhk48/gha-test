import envConfig from '@configs/env';
import { User as UserIcon } from '@components/Icon';
import { useAvatarUrl } from '@hooks/ReactQuery';
import Image from './styles';

interface Props {
	userIconWidth: number;
	userIconHeight: number;
}

export default function AvatarImage({ userIconWidth, userIconHeight }: Props) {
	const avatarUrl = useAvatarUrl();

	return avatarUrl.isLoading || !avatarUrl.data ? (
		<UserIcon width={userIconWidth} height={userIconHeight} />
	) : (
		<Image src={`${envConfig.avatarImageBaseUrl}/${avatarUrl.data}`} alt="user avatar" />
	);
}
