import prisma from '@lib/prisma';

type AvatarURL = string | null | undefined;

export default async function getAvatar(userId: number): Promise<AvatarURL> {
	const user = await prisma.user.findFirst({
		where: { id: userId },
		select: { avatar: true }
	});

	return user?.avatar;
}
