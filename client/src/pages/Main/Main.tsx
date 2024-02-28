import { PageLayout, SelectSudokuForm } from 'components'
import { StyledContainer } from 'pages/Main/styles'
import { Paper } from '@mui/material'
import Typography from '@mui/material/Typography'
import { colors } from 'assets/styles/colors'
import Box from '@mui/material/Box'


const Main = () => {



	return (
		<PageLayout>
			<StyledContainer>
				<Typography variant={ 'h2' } color={ colors.main_white } fontWeight={ 'bold' }>
					Welcome to the sudoku solver
				</Typography>

				<SelectSudokuForm/>
			</StyledContainer>
		</PageLayout>
	)
}

export default Main