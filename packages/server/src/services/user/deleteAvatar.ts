import { deleteAvatarFromS3 } from '@services/s3';

import prisma from '@lib/prisma';
import getAvatar from './getAvatar';

export default async function deleteAvatar(userId: number) {
	const fileName = await getAvatar(userId);
	if (!fileName) throw new Error('User does not have an avatar image.');
	await deleteAvatarFromS3(fileName);

	await prisma.user.update({
		where: { id: userId },
		data: { avatar: null }
	});
}
