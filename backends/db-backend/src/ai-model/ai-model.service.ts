import { ConflictException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { AiModel } from 'src/ai-model/ai-model.schema'
import { configDotenv } from 'dotenv'
import { HttpService } from '@nestjs/axios'
import { from, map, mergeMap, Observable } from 'rxjs'
import { type ModelResponse } from 'src/ai-model/types'


configDotenv()

@Injectable()
export class AiModelService {
	private readonly AI_API_URL = process.env.AI_BACKEND_URL
	private readonly DIJIT_DETECTOR_MODEL_NAME = 'dijit_detector_model.keras'

	constructor(
		@InjectModel(AiModel.name) private readonly aiModel: Model<AiModel>,
		private readonly http: HttpService,
	) {
	}

	async createDijitDetectorModel(): Promise<Observable<AiModel>> {
		const isExists = await this.findByName(this.DIJIT_DETECTOR_MODEL_NAME)

		if (isExists) throw new ConflictException(`Model "${ this.DIJIT_DETECTOR_MODEL_NAME }" already exists`)

		return this.http.get<ModelResponse>(this.AI_API_URL)
			.pipe(
				map(response => response.data),
				mergeMap(({ model_name, link_to_model }) => {
					const createdModel = new this.aiModel({ model_name, link_to_model })
					return from(createdModel.save())
				}),
			)
	}

	async findAll(): Promise<AiModel[]> {
		return await this.aiModel.find({}).exec()
	}

	async findByName(name: string): Promise<AiModel> {
		return await this.aiModel.findOne({ name }).exec()
	}
}