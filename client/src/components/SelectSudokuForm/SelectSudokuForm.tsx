import { ChangeEventHandler, useRef, useState } from 'react'
import { Box, Button, Paper, Typography } from '@mui/material'
import { colors } from 'assets/styles/colors'
import PhotoOutlinedIcon from '@mui/icons-material/PhotoOutlined'
import axios from 'axios'


const SelectSudokuForm = () => {
	const [ selectedFile, setSelectedFile ] = useState<Blob | null>(null)
	const [ selectedFileSrc, setSelectedFileSrc ] = useState<string | null>(null)
	const fileInputRef = useRef<HTMLInputElement | null>(null)
	const [ resultImage, setResultImage ] = useState<string>('')

	const getResult = async () => {
		if (selectedFile) {
			const formData = new FormData()
			formData.append('fingerprint', 'test_fp')
			formData.append('image', selectedFile)

			try {
				const response = await axios.post('http://localhost:4000/api/sudoku/add-new-sudoku', formData, {
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				})

				console.log('Response:', response.data)
				setResultImage(response.data.completeImageLink)
			} catch (error) {
				// Handle error
				console.error('Error uploading file:', error)
			}
		} else {
			// Handle case where no file is selected
			console.error('No file selected')
		}
	}


	const handleFileChange: ChangeEventHandler<HTMLInputElement> = (event) => {
		const file = event?.target?.files?.[0]

		if (file) {
			const reader = new FileReader()

		reader.readAsArrayBuffer(file);

    reader.onload = () => {
      // @ts-ignore
	    const blob = new Blob([reader.result], { type: file.type });
			setSelectedFile(blob)
      // this.uploadImage(blob);
    }
			// reader.onloadend = () => {
			// 	setSelectedFileSrc(reader.result as string)
			// }
			// reader.readAsDataURL(file)
		}
	}

	const handlePlaceholderClick = () => {
		const fileInput = fileInputRef.current
		if (fileInput) {
			fileInput.click()
		}
	}

	return (
		<Box>
			<Paper sx={ { width: 'fit-content', p: 4 } }>
				{/*<Typography sx={ { mr: 2 } }>Upload sudoku image</Typography>*/ }

				<Box sx={ { border: `solid ${ colors.primary } 2px`, borderRadius: '10px' } }>
					{ selectedFile ? (null
						// <img
						// 	src={ selectedFileSrc as string }
						// 	alt="Uploaded preview"
						// 	style={ { maxWidth: '100%', maxHeight: '200px', marginTop: '10px' } }
						// />
					) : (
						<Box
							onClick={ handlePlaceholderClick }
							sx={ {
								width: 320,
								height: 320,
								bgcolor: colors.regular_gray,
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								borderRadius: '8px',
							} }>
							<PhotoOutlinedIcon sx={ { width: '20%', height: '20%' } }/>
							<Typography sx={ { mr: 2 } }>Upload sudoku image</Typography>
						</Box>
					) }
				</Box>

				{ resultImage && (
					<img
						src={ resultImage }
						alt="result preview"
						style={ { maxWidth: '100%', maxHeight: '200px', marginTop: '10px' } }
					/>
				) }


				<label htmlFor="upload-file">
					<Button
						variant="contained"
						component="span"
						sx={ {
							bgcolor: colors.dark_secondary,
							'&:hover': {
								bgcolor: colors.light_secondary,
							},
							display: 'block',
							width: 'fit-content',
							margin: '14px auto',
						} }
					>
						{ selectedFile ? 'Upload another one' : 'Upload File' }
					</Button>
				</label>

				<input
					ref={ fileInputRef }
					id="upload-file"
					type="file"
					accept="image/*"
					hidden
					onChange={ handleFileChange }
				/>

				<Button
					onClick={ getResult }
					variant="contained"
					component="span"
					sx={ {
						bgcolor: colors.dark_secondary,
						'&:hover': {
							bgcolor: colors.light_secondary,
						},
						display: 'block',
						width: 'fit-content',
						margin: '14px auto',
					} }
				>
					calc
				</Button>

			</Paper>
		</Box>
	)
}

export default SelectSudokuForm
