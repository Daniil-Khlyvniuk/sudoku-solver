import { Injectable } from '@nestjs/common'
import { DeleteObjectCommand, PutBucketPolicyCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3'


@Injectable()
export class S3Service {
	private readonly s3: S3Client
	private readonly s3BucketName: string
	private readonly bucketUrl: string

	public constructor() {
		this.s3 = new S3Client({
			region: process.env.AWS_REGION,
			credentials: {
				accessKeyId: process.env.AWS_ACCESS_KEY,
				secretAccessKey: process.env.AWS_SECRET_KEY,
			},
		})
		this.s3BucketName = process.env.S3_BUCKET_NAME
		this.bucketUrl = `https://${ this.s3BucketName }.s3.amazonaws.com/images/`
	}

	async upload(transformedImageBuffer: Buffer, filename: string) {
		const uploadParams = {
			Bucket: this.s3BucketName,
			Key: filename,
			Body: transformedImageBuffer,
			ContentType: 'image/webp',
		}

		const command = new PutObjectCommand(uploadParams)
		await this.s3.send(command)

		const bucketPolicy = {
			Version: '2012-10-17',
			Statement: [
				{
					Sid: 'PublicRead',
					Effect: 'Allow',
					Principal: '*',
					Action: 's3:GetObject',
					Resource: `arn:aws:s3:::${ this.s3BucketName }/*`,
				},
			],
		}

		const putPolicyParams = {
			Bucket: this.s3BucketName,
			Policy: JSON.stringify(bucketPolicy),
		}

		const putPolicyCommand = new PutBucketPolicyCommand(putPolicyParams)
		await this.s3.send(putPolicyCommand)

		return `${ this.bucketUrl }/${ filename }`
	}

	async deleteFile(filename: string): Promise<void> {
		const deleteParams = {
			Bucket: this.s3BucketName,
			Key: filename,
		}

		const command = new DeleteObjectCommand(deleteParams)
		await this.s3.send(command)
	}
}
