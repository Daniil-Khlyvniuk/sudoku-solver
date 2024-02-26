import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { User, UserSchema } from 'src/user/user.schema'
import { UserController } from 'src/user/user.controller'
import { UserService } from 'src/user/user.service'
import { HttpModule } from '@nestjs/axios'


@Module({
	imports: [
		MongooseModule.forFeature([ { name: User.name, schema: UserSchema } ]),
		HttpModule
	],
	controllers: [ UserController ],
	providers: [ UserService ],
})

export class UserModule {
}