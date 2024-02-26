import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { SolveSudoku } from './solve-sudoku-model.model'
import { configDotenv } from 'dotenv'
import { HttpService } from '@nestjs/axios'
import { Observable, Subscription } from 'rxjs'


configDotenv()

@Injectable()
export class ProductsService {
	private readonly baseUrl = process.env.AI_BACKEND_URL || ''

	constructor(
		@InjectModel('SolveSudoku') private readonly sudokuSolverModel: Model<SolveSudoku>,
		private readonly http: HttpService,
	) {
	}

	async create(product: SolveSudoku): Promise<Subscription> {
		const models = await this.find();
		if (models.length)

		return this.http.get(this.baseUrl).subscribe(async (model) => {
			const createdModel = new this.sudokuSolverModel(model)
			return await createdModel.save()
		})
	}

	async find(): Promise<SolveSudoku[]> {
		return await this.sudokuSolverModel.find().exec()
	}

	async update(id: string, product: SolveSudoku): Promise<SolveSudoku> {
		// return await this.productModel.findByIdAndUpdate(id, product, {
		// 	new: true,
		// })
	}

	async remove(id: string): Promise<any> {
		// return await this.productModel.findByIdAndRemove(id)
	}
}