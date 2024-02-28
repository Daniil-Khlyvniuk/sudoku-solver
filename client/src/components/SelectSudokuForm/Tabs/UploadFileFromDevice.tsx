import React, { ChangeEventHandler, useRef, useState } from 'react'
import { Box, Button, Paper, Typography } from '@mui/material'
import { colors } from 'assets/styles/colors'
import PhotoOutlinedIcon from '@mui/icons-material/PhotoOutlined'
import CachedIcon from '@mui/icons-material/Cached'
import { SudokuResponse } from 'utils/api/types'
import FingerprintJS from '@fingerprintjs/fingerprintjs'
import { calcSudoku } from 'utils/api/API'


const UploadFileFromDevice = () => {
	const [ selectedFile, setSelectedFile ] = useState<Blob | null>(null)
	const [ previewImg, setPreviewImage ] = useState<string>('')
	const fileInputRef = useRef<HTMLInputElement | null>(null)
	const [ processedSudoku, setProcessedSudoku ] = useState<SudokuResponse | null>(null)


	const getResult = async (): Promise<void> => {
		if (selectedFile) {
			const fp = await FingerprintJS.load()
			const visitorId = await fp.get().then(result => result.visitorId)
			const res = await calcSudoku(visitorId, selectedFile)

			setProcessedSudoku(res)
			setPreviewImage(res.completeImageLink)
		}
	}


	const handleFileChange: ChangeEventHandler<HTMLInputElement> = (event) => {
		const file = event?.target?.files?.[0]

		if (file) {
			const reader = new FileReader()

			reader.readAsArrayBuffer(file)

			reader.onload = () => {
				const blob = new Blob([ reader.result as ArrayBuffer ], { type: file.type })
				setSelectedFile(blob)
				setPreviewImage(URL.createObjectURL(blob))
			}
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
			<Paper sx={ { width: 'fit-content', p: 4, bgcolor: colors.dark_gray, cursor: 'pointer' } }>
				{ processedSudoku && (
					<Box
						onClick={ handlePlaceholderClick }
						sx={ {
							width: 98,
							minHeight: 98,
							bgcolor: colors.regular_gray,
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							borderRadius: '8px',
							mb: 2,
						} }>
						<img
							src={ processedSudoku.initialImageLink }
							alt="result preview"
							style={ { maxWidth: '100%', maxHeight: '200px', borderRadius: 'inherit' } }
						/>
					</Box>
				) }
				<Box
					onClick={ handlePlaceholderClick }
					sx={ {
						width: 320,
						minHeight: 320,
						bgcolor: colors.regular_gray,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						borderRadius: '8px',
					} }>
					{ selectedFile ? (
						<img
							src={ previewImg }
							alt="Uploaded preview"
							style={ { width: '100%', borderRadius: 'inherit', border: `solid ${ colors.primary } 2px` } }
						/>
					) : (
						<>
							<PhotoOutlinedIcon sx={ { width: '20%', height: '20%' } }/>
							<Typography sx={ { mr: 2 } }>Upload sudoku image</Typography>
						</>
					) }
				</Box>

				<label htmlFor="upload-file">
					<Button
						variant="contained"
						component="span"
						sx={ {
							bgcolor: colors.dark_secondary,
							'&:hover': {
								bgcolor: colors.light_secondary,
							},
							display: 'flex',
							alignItems: 'center',
							width: 'fit-content',
							margin: '14px auto',
						} }
					>
						{ selectedFile
							? <><CachedIcon sx={ { mr: 1 } }/>{ ' ' } Upload another one</>
							: 'Upload File'
						}
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
					disabled={ !selectedFile }
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

export default UploadFileFromDevice