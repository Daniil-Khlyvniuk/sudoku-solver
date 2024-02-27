import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'
import { Sudoku } from 'src/sudoku/sudoku.schema'


@Schema({ timestamps: true })
export class User extends Document {
	@Prop({ required: true, unique: true })
	_browser_fingerprint!: string // use it as an id, TODO: remove it if registration feature is implemented

	@Prop({ type: [ { type: Types.ObjectId, ref: Sudoku.name } ] })
	sudokuList: Sudoku[]

	@Prop({ type: Date, default: Date.now })
	createdAt!: Date
}


export const UserSchema = SchemaFactory.createForClass(User)
