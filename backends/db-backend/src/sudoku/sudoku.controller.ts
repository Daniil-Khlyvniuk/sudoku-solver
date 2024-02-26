import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common'
import { SudokuService } from 'src/sudoku/sudoku.service'
import { Sudoku } from 'src/sudoku/sudoku.schema'


@Controller('sudoku')
export class SudokuController {
	constructor(
		private readonly sudokuSrv: SudokuService,
	) {
	}

	@Get()
	async findAll(): Promise<Sudoku[]> {
		return this.sudokuSrv.findAll()
	}

	@Post('add-sudoku')
	async create(@Body() createSudokuDto: Partial<Sudoku>): Promise<Sudoku> {
		return this.sudokuSrv.create(createSudokuDto)
	}

	@Patch('update-sudoku/:id')
	async update(@Body() updateSudokuDto: Partial<Sudoku>, @Param('id') id: string): Promise<Sudoku> {
		return this.sudokuSrv.update(id, updateSudokuDto)
	}
}