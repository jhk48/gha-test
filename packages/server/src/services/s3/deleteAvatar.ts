import { DeleteObjectCommand, DeleteObjectCommandInput } from '@aws-sdk/client-s3';
import { s3Client } from '@lib/s3';
import envConfig from '@config';

export default async function deleteAvatarFromS3(fileName: string) {
	const deleteObjParams: DeleteObjectCommandInput = {
		Bucket: envConfig.aws.bucketName,
		Key: fileName
	};

	await s3Client.send(new DeleteObjectCommand(deleteObjParams));
}
