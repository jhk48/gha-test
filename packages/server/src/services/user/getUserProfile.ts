import { UserProfile } from '@portbullio/shared/src/types';
import prisma from '@lib/prisma';

export default async function getUserProfile(userId: number): Promise<UserProfile> {
	const data = await prisma.user.findFirst({
		where: { id: userId },
		select: {
			username: true,
			email: true,
			bio: true,
			location: true
		}
	});

	if (!data) throw new Error('User not found');
	return data;
}
