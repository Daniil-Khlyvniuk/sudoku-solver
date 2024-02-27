import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { configDotenv } from 'dotenv'
import { Sudoku } from 'src/sudoku/sudoku.schema'
import { UserService } from 'src/user/user.service'
import { CompleteSudokuResponse } from 'src/sudoku/types'
import { S3Service } from 'src/s3/s3.service'
import { v4 as uuidv4 } from 'uuid'


configDotenv()

@Injectable()
export class SudokuService {
	constructor(
		@InjectModel(Sudoku.name) private readonly sudokuModel: Model<Sudoku>,
		private readonly userSrv: UserService,
		private readonly s3: S3Service,
	) {
	}

	async addNewSudokuItem(userFingerprint: string, sudokuDto: Partial<Sudoku>): Promise<Sudoku> {
		const [ sudoku, user ] = await Promise.all([
			this.create(sudokuDto),
			this.userSrv.createNewOrGet(userFingerprint),
		])

		await this.userSrv.update(userFingerprint, {
			...user,
			sudokuList: [
				...(user.sudokuList || []),
				sudoku,
			],
		})

		return sudoku
	}

	async combineCompleteSudokuResponse(currSudokuId: string, response: CompleteSudokuResponse): Promise<Sudoku> {
		const completeImageLink = await this.s3.upload(response.result_img, `completed-sudoku-${ uuidv4() }.webp`)

		await this.sudokuModel.findOneAndUpdate({ _id: currSudokuId }, {
			completeImageLink,
			filledCompleteMatrix: response.solved_board,
			digitsDetectorModel: response.model_name,
			elapsedTime: response.elapsed_time,
		})

		return this.sudokuModel.findOne({ _id: currSudokuId })
	}

	async create(createSudokuDto: Partial<Sudoku>): Promise<Sudoku> {
		return new this.sudokuModel(createSudokuDto).save()
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