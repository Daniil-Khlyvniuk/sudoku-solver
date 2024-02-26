import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose'
import { Types } from 'mongoose'
import { Sudoku } from 'src/sudoku/sudoku.schema'


@Schema({ timestamps: true })
export class User {
	@Prop({ required: true, unique: true })
	_browser_fingerprint!: string // use it as an id, TODO: replaced on regular it if i implemented registration feature

	@Prop({ type: [ Types.ObjectId ], ref: Sudoku.name })
	sudokuList: Sudoku[]

	@Prop({ type: Date, default: Date.now })
	createdAt!: Date
}


export const UserSchema = SchemaFactory.createForClass(User)
