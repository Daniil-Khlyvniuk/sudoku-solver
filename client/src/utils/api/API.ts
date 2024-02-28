import axios from 'axios'
import { SudokuResponse } from 'utils/api/types'


export const calcSudoku = async (fp: string, initialSudokuImage: Blob) => {
	const formData = new FormData()
	formData.append('fingerprint', fp)
	formData.append('image', initialSudokuImage)

	const response = await axios.post<SudokuResponse>(
		`${ process.env.REACT_APP_DB_API_HOST }/api/sudoku/add-new-sudoku`,
		formData,
		{
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		},
	)
	return response.data
}
