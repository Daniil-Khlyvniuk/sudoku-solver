import { Footer, Header } from 'components'
import { Props } from 'components/PageLayout/types'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import * as React from 'react'
import { colors } from 'assets/styles/colors'


const PageLayout = ({ children }: Props) => {
	return (
		<>
			<Header/>
			<Box component="main" sx={ { p: 3, bgcolor: colors.regular_gray } }>
				<Toolbar/>
				{ children }
			</Box>
			<Footer/>
		</>
	)
}

export default PageLayout