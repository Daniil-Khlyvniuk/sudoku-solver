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
		@InjectModel(User.name) private readonly userModel: Model<User>,
	) {
	}

	async createNewOrGet(fingerprint: string): Promise<User> {
		const user = await this.userModel.findOne({ _browser_fingerprint: fingerprint })
		return user || new this.userModel({ _browser_fingerprint: fingerprint }).save()
	}

	async create(createUserDto: Partial<User>): Promise<User> {
		return new this.userModel(createUserDto).save()
	}

	async update(fp: string, updateUserDto: Partial<User>): Promise<User> {
		const updateCandidate = await this.findByFingerprint(fp)

		return this.userModel.findOneAndUpdate({ _browser_fingerprint: fp }, {
			...updateCandidate,
			...updateUserDto,
		})
	}


	async findAll(): Promise<User[]> {
		return await this.userModel.find({}).exec()
	}

	async findById(id: string): Promise<User> {
		return await this.userModel.findOne({ id }).exec()
	}

	async findByFingerprint(fp: string): Promise<User> {
		return await this.userModel.findOne({ _browser_fingerprint: fp }).exec()
	}
}