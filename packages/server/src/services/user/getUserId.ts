import prisma from '@lib/prisma';

export default async function getUserId(email: string): Promise<number> {
	const { id: userId } = (await prisma.user.findFirst({
		where: { email }
	})) ?? { id: -1 };

	return userId;
}
