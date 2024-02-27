import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { MongooseModule } from '@nestjs/mongoose'
import { AiModelModule } from 'src/ai-model/ai-model.module'
import * as process from 'process'
import { configDotenv } from 'dotenv'
import { SudokuModule } from 'src/sudoku/sudoku.module'
import { UserModule } from 'src/user/user.module'


configDotenv()

@Module({
	imports: [
		MongooseModule.forRoot(process.env.DB_CONNECTION_LINK),
		AiModelModule,
		SudokuModule
	],
	controllers: [ AppController ],
	providers: [ AppService ],
})
export class AppModule {
}