import { Controller, Get, Param } from '@nestjs/common'
import { AiModelService } from 'src/ai-model/ai-model.service'
import { AiModel } from 'src/ai-model/ai-model.schema'
import { lastValueFrom } from 'rxjs'


@Controller('ai-model')
export class AiModelController {
	constructor(
		private readonly aiModelService: AiModelService,
	) {
	}

	@Get()
	async findAll(): Promise<AiModel[]> {
		return this.aiModelService.findAll()
	}

	@Get(':name')
	async findOne(@Param('name') name: string): Promise<AiModel> {
		return this.aiModelService.findByName(name)
	}

	@Get('create-model')
	async create(): Promise<AiModel> {
		const result = await this.aiModelService.createDijitDetectorModel()
		return lastValueFrom(result)
	}
}