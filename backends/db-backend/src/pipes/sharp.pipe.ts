import { Injectable, PipeTransform } from '@nestjs/common'
import * as sharp from 'sharp'
import { v4 as uuidv4 } from 'uuid'
import { S3Service } from 'src/s3/s3.service'


@Injectable()
export class SharpPipe implements PipeTransform<Express.Multer.File[], Promise<string>> {
	constructor(private readonly s3Srv: S3Service) {
	}

	async transform(images: Express.Multer.File[]): Promise<string> {
		const image = images?.[0]
		if (!image) return ''

		const quality = 100
		const filename = uuidv4() + '.webp'

		const transformedImageBuffer = await sharp(image.buffer)
			.webp({ quality })
			.toBuffer()

		return this.s3Srv.upload(transformedImageBuffer, filename)
	}
}
