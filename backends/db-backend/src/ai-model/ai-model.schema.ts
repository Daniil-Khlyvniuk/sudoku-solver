import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose'
import { Document } from 'mongoose'


@Schema({ timestamps: true })
export class AiModel extends Document {
	@Prop({ required: true, unique: true })
	name: string

	@Prop({ required: true })
	linkToModel: string

	@Prop({ type: Date, default: Date.now })
	createdAt: Date
}


export const AiModelSchema = SchemaFactory.createForClass(AiModel)
