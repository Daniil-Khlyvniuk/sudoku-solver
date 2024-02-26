import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Sudoku, SudokuSchema } from 'src/sudoku/sudoku.schema'
import { SudokuController } from 'src/sudoku/sudoku.controller'
import { SudokuService } from 'src/sudoku/sudoku.service'
import { S3Module } from 'src/s3/s3.module'
import { HttpModule } from '@nestjs/axios'


@Module({
	imports: [
		MongooseModule.forFeature([ { name: Sudoku.name, schema: SudokuSchema } ]),
		HttpModule,
		S3Module
	],
	controllers: [ SudokuController ],
	providers: [ SudokuService ],
})
export class SudokuModule {
}