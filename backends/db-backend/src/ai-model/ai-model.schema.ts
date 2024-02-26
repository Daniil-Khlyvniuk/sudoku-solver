import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose'


@Schema({ timestamps: true })
export class AiModel {
	@Prop({ required: true, unique: true })
	name: string

	@Prop({ required: true })
	linkToModel: string

	@Prop({ type: Date, default: Date.now })
	created_at: Date
}


export const AiModelSchema = SchemaFactory.createForClass(AiModel)
