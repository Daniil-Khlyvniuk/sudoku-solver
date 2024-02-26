import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { configDotenv } from 'dotenv'
import { Sudoku } from 'src/sudoku/sudoku.schema'
import { User } from 'src/user/user.schema'


configDotenv()

@Injectable()
export class UserService {
	constructor(
		@InjectModel(User.name) private readonly sudokuModel: Model<User>,
	) {
	}

	async create(createSudokuDto: Partial<Sudoku>): Promise<User> {
		return this.sudokuModel.create(createSudokuDto)
	}

	async update(id: string, updateSudokuDto: Partial<Sudoku>): Promise<User> {
		const updateCandidate = await this.findById(id)

		await this.sudokuModel.updateOne({ id }, {
			...updateCandidate,
			...updateSudokuDto,
		})

		return this.findById(id)
	}


	async findAll(): Promise<User[]> {
		return await this.sudokuModel.find({}).exec()
	}

	async findById(id: string): Promise<User> {
		return await this.sudokuModel.findOne({ id }).exec()
	}
}