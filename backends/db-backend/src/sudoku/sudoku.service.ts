import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { configDotenv } from 'dotenv'
import { HttpService } from '@nestjs/axios'
import { Sudoku } from 'src/sudoku/sudoku.schema'


configDotenv()

@Injectable()
export class SudokuService {
	constructor(
		@InjectModel(Sudoku.name) private readonly sudokuModel: Model<Sudoku>,
		private readonly http: HttpService,
	) {
	}

	async create(createSudokuDto: Partial<Sudoku>): Promise<Sudoku> {
		return this.sudokuModel.create(createSudokuDto)
	}

	async update(id: string, updateSudokuDto: Partial<Sudoku>): Promise<Sudoku> {
		const updateCandidate = await this.findById(id)

		await this.sudokuModel.updateOne({ id }, {
			...updateCandidate,
			...updateSudokuDto,
		})

		return this.findById(id)
	}


	async findAll(): Promise<Sudoku[]> {
		return await this.sudokuModel.find({}).exec()
	}

	async findById(id: string): Promise<Sudoku> {
		return await this.sudokuModel.findOne({ id }).exec()
	}
}