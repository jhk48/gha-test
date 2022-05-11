import { CognitoIdentityClient } from '@aws-sdk/client-cognito-identity';
import { fromCognitoIdentityPool } from '@aws-sdk/credential-provider-cognito-identity';
import { S3Client } from '@aws-sdk/client-s3';
import envConfig from '@config';

export default new S3Client({
	region: envConfig.aws.region,
	credentials: fromCognitoIdentityPool({
		client: new CognitoIdentityClient({ region: envConfig.aws.region }),
		identityPoolId: envConfig.aws.identityPoolId as string
	})
});
