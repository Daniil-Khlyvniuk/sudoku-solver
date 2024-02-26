import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { AiModelController } from 'src/ai-model/ai-model.controller'
import { AiModelService } from 'src/ai-model/ai-model.service'
import { AiModel, AiModelSchema } from 'src/ai-model/ai-model.schema'
import { HttpModule } from '@nestjs/axios'


@Module({
	imports: [
		MongooseModule.forFeature([ { name: AiModel.name, schema: AiModelSchema } ]),
		HttpModule,
	],
	controllers: [ AiModelController ],
	providers: [ AiModelService ],
})
export class AiModelModule {
}