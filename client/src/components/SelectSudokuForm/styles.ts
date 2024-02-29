import { styled, Tab } from '@mui/material'
import { colors } from 'assets/styles/colors'
import { TabList } from '@mui/lab'


export const StyledTab = styled(Tab)({
	color: colors.primary,
	'&.Mui-selected': { color: colors.medium_secondary },
	fontWeight: 'bold',
	fontSize: 16,
})