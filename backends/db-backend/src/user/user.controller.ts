import { Controller, Get } from '@nestjs/common'
import { UserService } from 'src/user/user.service'
import { User } from 'src/user/user.schema'


@Controller('user')
export class UserController {
	constructor(private readonly userSrv: UserService) {
	}

	@Get()
	async findAll(): Promise<User[]> {
		return this.userSrv.findAll()
	}

	// @Get(':name')
	// async findOne(@Param('name') name: string): Promise<User> {
	// 	return this.userSrv.findByName(name)
	// }

	// @Get('create-model')
	// async create(): Promise<User> {
	// 	const result = await this.userSrv.createDijitDetectorModel()
	// 	return lastValueFrom(result)
	// }
}