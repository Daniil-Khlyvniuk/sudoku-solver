import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose'
import { AiModel } from 'src/ai-model/ai-model.schema'
import { Types } from 'mongoose'


@Schema({ timestamps: true })
export class Sudoku {
	@Prop({ required: false })
	name?: string

	@Prop({ required: true })
	initialImageLink!: string

	@Prop({ required: false })
	completeImageLink?: string

	@Prop({ required: false })
	filledCompleteMatrix?: number[][]

	@Prop({ type: Types.ObjectId, ref: AiModel.name })
	digitsDetectorModel?: AiModel

	@Prop({ required: false })
	elapsedTime?: number

	@Prop({ type: Date, default: Date.now })
	createdAt!: Date
}


export const SudokuSchema = SchemaFactory.createForClass(Sudoku)
