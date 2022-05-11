import { UserProfile } from '@portbullio/shared/src/types';
import prisma from '@lib/prisma';

interface EditUserProfileArgs {
	userId: number;
	username: string;
	bio: string | null;
	location: string | null;
}

export default async function editUserProfile({
	userId,
	username,
	bio,
	location
}: EditUserProfileArgs): Promise<UserProfile> {
	const modifiedProfile = await prisma.user.update({
		where: { id: userId },
		data: { username, bio, location }
	});

	return {
		username: modifiedProfile.username,
		email: modifiedProfile.email,
		bio: modifiedProfile.bio,
		location: modifiedProfile.location
	};
}
