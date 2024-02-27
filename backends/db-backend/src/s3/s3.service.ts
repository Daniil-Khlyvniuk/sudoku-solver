import { Injectable } from '@nestjs/common'
import { DeleteObjectCommand, PutBucketPolicyCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3'


@Injectable()
export class S3Service {
	private readonly s3: S3Client
	private readonly s3BucketName: string
	private readonly bucketUrl: string
	private readonly policy = {
		Version: '2012-10-17',
		Statement: [
			{
				Sid: 'PublicRead',
				Effect: 'Allow',
				Principal: '*',
				Action: [
					's3:Put*',
					's3:Get*',
				],
				Resource: `arn:aws:s3:::${ process.env.S3_BUCKET_NAME }/*`,
			},
		],
	}

	public constructor() {
		this.s3 = new S3Client({
			region: process.env.AWS_REGION,
			credentials: {
				accessKeyId: process.env.AWS_ACCESS_KEY,
				secretAccessKey: process.env.AWS_SECRET_KEY,
			},
		})
		this.s3BucketName = process.env.S3_BUCKET_NAME
		this.bucketUrl = `https://${ this.s3BucketName }.s3.amazonaws.com`
	}

	async upload(image: Buffer | string, filename: string): Promise<string> {
		const imageBuffer = (typeof image === 'string')
			? this.base64ToBuffer(image)
			: image

		const uploadParams = {
			Bucket: this.s3BucketName,
			Key: filename,
			Body: imageBuffer,
			ContentType: 'image/webp',
		}

		const command = new PutObjectCommand(uploadParams)
		await this.s3.send(command)

		const putPolicyParams = {
			Bucket: this.s3BucketName,
			Policy: JSON.stringify(this.policy),
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

	base64ToBuffer(base64String: string): Buffer {
		return Buffer.from(base64String, 'base64')
	}

}
