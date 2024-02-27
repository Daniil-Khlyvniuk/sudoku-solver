import { Body, Controller, Get, Param, Patch, Post, UploadedFiles, UseInterceptors } from '@nestjs/common'
import { SudokuService } from 'src/sudoku/sudoku.service'
import { Sudoku } from 'src/sudoku/sudoku.schema'
import { HttpService } from '@nestjs/axios'
import { SharpPipe } from 'src/pipes/sharp.pipe'
import { lastValueFrom, map } from 'rxjs'
import { CompleteSudokuResponse } from 'src/sudoku/types'
import { configDotenv } from 'dotenv'
import { AnyFilesInterceptor } from '@nestjs/platform-express'


configDotenv()

@Controller('sudoku')
export class SudokuController {
	private readonly AI_API_URL = process.env.AI_BACKEND_URL || ''

	constructor(
		private readonly sudokuSrv: SudokuService,
		private readonly http: HttpService,
	) {
	}

	@Get()
	async findAll(): Promise<Sudoku[]> {
		return this.sudokuSrv.findAll()
	}

	@Post('add-new-sudoku')
	@UseInterceptors(AnyFilesInterceptor())
	async create(
		@Body() body: (Partial<Sudoku> & { fingerprint: string }),
		@UploadedFiles(SharpPipe) image: string,
	): Promise<Sudoku> {
		const { fingerprint, ...createSudokuDto } = body


		const sudoku = await this.sudokuSrv.addNewSudokuItem(
			fingerprint,
			{ ...createSudokuDto, initialImageLink: image },
		)

			return lastValueFrom(
				this.http.post<CompleteSudokuResponse>(`${ this.AI_API_URL }/api/sudoku/solve/`, { init_img: image })
					.pipe(
						map(response => response.data),
						map(data => this.sudokuSrv.combineCompleteSudokuResponse(sudoku._id, data)),
					),
			)
	}

	@Patch('update-sudoku/:id')
	async update(@Body() updateSudokuDto: Partial<Sudoku>, @Param('id') id: string): Promise<Sudoku> {
		return this.sudokuSrv.update(id, updateSudokuDto)
	}
}