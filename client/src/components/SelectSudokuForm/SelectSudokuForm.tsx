import { SyntheticEvent, useState } from 'react'
import { Box, Tab, Tabs } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { UploadFileFromDevice } from 'components/SelectSudokuForm/Tabs'
import { TypesOfUserInput } from 'components/SelectSudokuForm/Tabs/values'
import { colors } from 'assets/styles/colors'


const SelectSudokuForm = () => {
	const [ value, setValue ] = useState<TypesOfUserInput>(TypesOfUserInput.upload)

	const handleChange = (_: any, newValue: TypesOfUserInput) => {
		setValue(newValue)
	}

	const tabSx = {
		color: colors.primary,
		'&.Mui-selected': { color: colors.medium_secondary },
		fontWeight: 'bold',
		fontSize: 16
	}

	return (
		<TabContext value={ value }>
			<Box sx={ { borderBottom: 1, borderColor: 'divider' } }>
				<TabList
					onChange={ handleChange }
					variant={ 'scrollable' }
					sx={{
						'& .MuiTabs-indicator': {
							bgcolor: colors.medium_secondary
						}
					}}
				>
					<Tab
						sx={ tabSx }
						label={ TypesOfUserInput.upload }
						value={ TypesOfUserInput.upload }
					/>
					<Tab sx={ tabSx } label={ TypesOfUserInput.selectTestImages } value={ TypesOfUserInput.selectTestImages }/>
					<Tab sx={ tabSx } label={ TypesOfUserInput.pasteLinkToImage } value={ TypesOfUserInput.pasteLinkToImage }/>
					<Tab sx={ tabSx } label={ TypesOfUserInput.takePhoto } value={ TypesOfUserInput.takePhoto }/>
				</TabList>
			</Box>
			<TabPanel value={ TypesOfUserInput.upload }>
				<UploadFileFromDevice/>
			</TabPanel>
			<TabPanel value={ TypesOfUserInput.selectTestImages }>{ TypesOfUserInput.selectTestImages }</TabPanel>
			<TabPanel value={ TypesOfUserInput.pasteLinkToImage }>Item Two</TabPanel>
			<TabPanel value={ TypesOfUserInput.takePhoto }>Item Three</TabPanel>
		</TabContext>
	)
}

export default SelectSudokuForm
