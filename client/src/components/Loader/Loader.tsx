import { Box } from '@mui/material'
import Lottie from 'lottie-react'
import loadingAnimation from 'assets/animationSources/ai-loading-animation.json'
import React from 'react'


const Loader = () => (
	<Box sx={ { position: 'absolute', inset: 0, zIndex: 1, bgcolor: 'rgba(0,0,0,0.6)' } }>
		<Lottie
			style={ {
				top: '50%',
				left: '50%',
				maxWidth: '50%',
				position: 'absolute',
				transform: 'translate(-50%, -50%)',
			} }
			animationData={ loadingAnimation }
			loop
		/>
	</Box>
)

export default Loader