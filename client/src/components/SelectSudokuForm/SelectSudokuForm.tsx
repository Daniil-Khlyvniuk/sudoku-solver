import { useState } from 'react'
import { Box } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { UploadFileFromDevice } from 'components/SelectSudokuForm/Tabs'
import { TypesOfUserInput } from 'components/SelectSudokuForm/Tabs/values'
import { StyledTab } from 'components/SelectSudokuForm/styles'


const SelectSudokuForm = () => {
	const [ value, setValue ] = useState<TypesOfUserInput>(TypesOfUserInput.selectTestImages)

	const handleChange = (_: any, newValue: TypesOfUserInput) => {
		setValue(newValue)
	}

	return (
		<TabContext value={ value }>
			<Box sx={ { borderBottom: 1, borderColor: 'divider', p: 4 } }>
				<TabList onChange={ handleChange } variant={ 'scrollable' }>
					<StyledTab label={ TypesOfUserInput.selectTestImages } value={ TypesOfUserInput.selectTestImages }/>
					<StyledTab label={ TypesOfUserInput.pasteLinkToImage } value={ TypesOfUserInput.pasteLinkToImage }/>
					{/*<StyledTab label={ TypesOfUserInput.takePhoto } value={ TypesOfUserInput.takePhoto }/>*/ }
				</TabList>
			</Box>
			<TabPanel value={ TypesOfUserInput.selectTestImages }>
				<UploadFileFromDevice mode={ TypesOfUserInput.selectTestImages }/>
			</TabPanel>
			<TabPanel value={ TypesOfUserInput.pasteLinkToImage }>
				<UploadFileFromDevice mode={ TypesOfUserInput.pasteLinkToImage }/>
			</TabPanel>
			{/*<TabPanel value={ TypesOfUserInput.takePhoto }>*/ }
			{/*	<UploadFileFromDevice mode={ TypesOfUserInput.takePhoto }/>*/ }
			{/*</TabPanel>*/ }
		</TabContext>
	)
}

export default SelectSudokuForm
