import * as mongoose from 'mongoose'


export const SolveSudokuModel = new mongoose.Schema({
	name: {
		type: String,
		required: false,
		default: 'solve_sudoku_model',
	},
	data: String,
})

export interface SolveSudoku extends mongoose.Document {
	name: string;
	data: string;
}