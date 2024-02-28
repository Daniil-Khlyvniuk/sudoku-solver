import { SyntheticEvent, useState } from 'react'
import { Box, Tab } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { UploadFileFromDevice } from 'components/SelectSudokuForm/Tabs'
import { TypesOfUserInput } from 'components/SelectSudokuForm/Tabs/values'


const SelectSudokuForm = () => {
	const [ value, setValue ] = useState<TypesOfUserInput>(TypesOfUserInput.upload)

	const handleChange = (_: any, newValue: TypesOfUserInput) => {
		setValue(newValue)
	}


	return (
		<TabContext value={ value }>
			<Box sx={ { borderBottom: 1, borderColor: 'divider' } }>
				<TabList onChange={ handleChange } aria-label="lab API tabs example">
					<Tab label={ TypesOfUserInput.upload } value={ TypesOfUserInput.upload }/>
					<Tab label={ TypesOfUserInput.pasteLinkToImage } value={ TypesOfUserInput.pasteLinkToImage }/>
					<Tab label={ TypesOfUserInput.takePhoto } value={ TypesOfUserInput.takePhoto }/>
				</TabList>
			</Box>
			<TabPanel value={ TypesOfUserInput.upload }>
				<UploadFileFromDevice/>
			</TabPanel>
			<TabPanel value={ TypesOfUserInput.pasteLinkToImage }>Item Two</TabPanel>
			<TabPanel value={ TypesOfUserInput.takePhoto }>Item Three</TabPanel>
		</TabContext>

	)
}

export default SelectSudokuForm
