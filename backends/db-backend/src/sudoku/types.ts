export interface CompleteSudokuResponse {
	initial_image: string
	result_img: string // base64
	solved_board: number[][]
	elapsed_time: number
	model_name: string
}