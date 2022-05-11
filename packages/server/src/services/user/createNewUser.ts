import prisma from '@lib/prisma';

export interface NewUserProps {
	username: string;
	email: string;
	currency?: string;
}

export default async function createNewUser({
	username,
	email,
	currency = 'krw'
}: NewUserProps): Promise<number> {
	const { id: newUserId } = await prisma.user.create({
		data: {
			username,
			email,
			currency
		}
	});

	return newUserId;
}
