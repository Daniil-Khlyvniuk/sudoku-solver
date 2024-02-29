import Box from '@mui/material/Box'
import { styled, TextField } from '@mui/material'
import { colors } from 'assets/styles/colors'
import Button from '@mui/material/Button'


export const StyledImageWrapper = styled(Box)({
	background: colors.medium_gray,
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	borderRadius: '8px',
	mb: 2,
	cursor: 'pointer',
})

export const StyledImage = styled('img')({
	width: '100%',
	borderRadius: 'inherit',
	border: `solid ${ colors.primary } 2px`,
})


export const StyledUploadBtn = styled(Button)({
	background: colors.medium_gray,
	'&:hover': {
		background: colors.light_gray,
	},
	display: 'flex',
	alignItems: 'center',
	width: 'fit-content',
	margin: '14px auto',
	padding: '12px 18px',
	color: colors.main_white,
	cursor: 'pointer',
	borderRadius: '4px',
})


export const StyledCalcBtn = styled(Button)(({ $isDisabled }: { $isDisabled: boolean }) => ({
	'&:hover': {
		background: colors.light_secondary,
	},
	display: 'block',
	width: 'fit-content',
	margin: '14px auto',
	opacity: $isDisabled ? 0.5 : 1,
	background: colors.dark_secondary,
	color: colors.main_white + ' !important',
	cursor: $isDisabled ? 'not-allowed !important' : 'pointer',
	fontSize: '18px',
	fontWeight: 'bold',
}))

export const StyledTextField = styled(TextField)({
	borderColor: colors.medium_secondary,
	marginTop: '18px',

	input: {
		fontWeight: 'bold',
		color: colors.light_secondary,
	},

	'& .MuiOutlinedInput-root': {
		'& fieldset': {
			borderColor: colors.light_gray,
		},
		'&:hover fieldset': {
			borderColor: colors.light_gray,
		},
		'&.Mui-focused fieldset': {
			borderColor: colors.dark_secondary,
		},
	},
	'& .MuiOutlinedInput-input': {
		color: colors.light_gray,
	},
	'& .MuiInputLabel-root': {
		color: colors.light_gray,
	},
	'& .MuiInputLabel-root.Mui-focused': {
		color: colors.dark_secondary,
	},
})