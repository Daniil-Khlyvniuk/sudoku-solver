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
}