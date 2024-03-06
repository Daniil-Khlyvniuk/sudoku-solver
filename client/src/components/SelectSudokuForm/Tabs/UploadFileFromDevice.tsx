import React, { ChangeEventHandler, useRef, useState } from 'react'
import { Box, Paper, TextField, Typography } from '@mui/material'
import { colors } from 'assets/styles/colors'
import PhotoOutlinedIcon from '@mui/icons-material/PhotoOutlined'
import CachedIcon from '@mui/icons-material/Cached'
import { SudokuResponse } from 'utils/api/types'
import FingerprintJS from '@fingerprintjs/fingerprintjs'
import { calcSudoku } from 'utils/api/API'
import {
	StyledCalcBtn,
	StyledImage,
	StyledImageWrapper, StyledTextField,
	StyledUploadBtn,
} from 'components/SelectSudokuForm/Tabs/styles'
import { Loader } from 'components'
import { TypesOfUserInput } from 'components/SelectSudokuForm/Tabs/values'
import { sudokuTest1, sudokuTest2, sudokuTest3, sudokuTest4, sudokuTest5 } from 'assets/images'


const UploadFileFromDevice = ({ mode }: { mode: TypesOfUserInput }) => {
	const TEST_IMAGES = [
		sudokuTest1,
		sudokuTest2,
		sudokuTest3,
		// sudokuTest4,
		sudokuTest5,
	]

	const fileInputRef = useRef<HTMLInputElement | null>(null)
	const [ selectedFile, setSelectedFile ] = useState<Blob | null>(null)
	const [ previewImg, setPreviewImage ] = useState<string>('')
	const [ processedSudoku, setProcessedSudoku ] = useState<SudokuResponse | null>(null)
	const [ isLoading, setIsLoading ] = useState<boolean>(false)

	const getResult = async (): Promise<void> => {
		if (selectedFile) {
			setIsLoading(true)

			try {
				const fp = await FingerprintJS.load()
				const visitorId = await fp.get().then(result => result.visitorId)
				const res = await calcSudoku(visitorId, selectedFile)

				setProcessedSudoku(res)
				setPreviewImage(res.completeImageLink)
			} catch (err) {
				console.log(err)
			} finally {
				setIsLoading(false)
			}
		}
	}

	const clear = () => {
		setSelectedFile(null)
		setPreviewImage('')
		setProcessedSudoku(null)
	}

	const handleFileChange: ChangeEventHandler<HTMLInputElement> = (event) => {
		if (processedSudoku) clear()
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
		if (selectedFile) return
		if (processedSudoku) clear()

		const fileInput = fileInputRef.current

		if (fileInput) fileInput.click()
	}

	const HiddenInput = (<input
		hidden
		ref={ fileInputRef }
		id={ 'upload-file' }
		type={ 'file' }
		accept={ 'image/*' }
		onChange={ handleFileChange }
	/>)


	return (
		<Box sx={ { p: 4 } }>
			<Paper
				sx={ {
					width: 'fit-content',
					maxWidth: '800px',
					minWidth: '320px',
					p: 4,
					bgcolor: colors.dark_gray,
					margin: '0 auto',
					position: 'relative',
				} }
			>
				{ isLoading && <Loader/> }

				{ mode === TypesOfUserInput.selectTestImages && (
					<Box sx={ { mb: 1, display: 'flex', gap: 2, justifyContent: 'center' } }>
						{ TEST_IMAGES.map((img) => (
							<StyledImageWrapper
								key={ img }
								onClick={ async () => {
									clear()
									const response = await fetch(img)
									const blob = await response.blob()

									setSelectedFile(blob)
									setPreviewImage(img)
								} }
								sx={ {
									width: 98,
									minHeight: 98,
									border: previewImg === img ? `solid ${ colors.light_secondary } 2px` : 'none',
								} }
							>
								<StyledImage src={ img } alt={ img }/>
							</StyledImageWrapper>
						)) }
					</Box>
				) }


				{ processedSudoku && (
					<Box
						sx={ {
							mb: 1,
							display: 'flex',
							gap: 2,
							windth: 'fit-content',
							p: 2,
							bgcolor: colors.light_gray,
							borderRadius: '4px',
						} }
					>
						<StyledImageWrapper
							onClick={ handlePlaceholderClick }
							sx={ { width: 98, minHeight: 98 } }
						>
							<StyledImage src={ processedSudoku.initialImageLink } alt={ 'result preview' }/>
						</StyledImageWrapper>

						<Box>
							<Typography color={ colors.primary }>
								Elapsed time: { processedSudoku.elapsedTime.toFixed(2) }s
							</Typography>
							<Typography color={ colors.primary }>Model
								name: { processedSudoku.digitsDetectorModel }</Typography>
						</Box>
					</Box>
				) }

				{ mode === TypesOfUserInput.selectTestImages && (
					<StyledImageWrapper
						onClick={ handlePlaceholderClick }
						sx={ { width: '100%', minHeight: 320, margin: '0 auto' } }
					>
						{ selectedFile
							? <StyledImage src={ previewImg } alt={ 'Uploaded preview' }/>
							: (<>
									<PhotoOutlinedIcon sx={ { width: '20%', height: '20%' } }/>
									<Typography sx={ { mr: 2 } }>Upload sudoku image</Typography>
								</>
							) }
					</StyledImageWrapper>
				) }

				{ mode === TypesOfUserInput.pasteLinkToImage && (
					<StyledImageWrapper sx={ { width: '100%', minHeight: 320, margin: '0 auto' } }>
						{ previewImg
							? <StyledImage src={ previewImg } alt={ 'Uploaded preview' }/>
							: (<>
									<PhotoOutlinedIcon sx={ { width: '20%', height: '20%' } }/>
								</>
							)
						}
					</StyledImageWrapper>
				) }

				{ mode === TypesOfUserInput.pasteLinkToImage && (
					<StyledTextField
						fullWidth
						inputProps={ { shrink: true } }
						label={ 'Paste a link to your image' }
						onInput={ async (ev: any) => {
							clear()
							const src = ev.target.value
							const response = await fetch(src)
							const blob = await response.blob()

							setSelectedFile(blob)
							setPreviewImage(src)
						} }
					/>
				) }

				<StyledCalcBtn
					disabled={ !selectedFile }
					onClick={ getResult }
					variant={ 'contained' }
					$isDisabled={ !selectedFile }
				>
					calc
				</StyledCalcBtn>

				{ mode === TypesOfUserInput.selectTestImages && (
					<label htmlFor={ 'upload-file' } onClick={ clear }>
						<StyledUploadBtn variant={ 'contained' } as={ 'span' } onClick={ clear }>
							{ selectedFile
								? <><CachedIcon sx={ { mr: 1 } }/>{ ' ' }Upload another one</>
								: 'Upload File'
							}
						</StyledUploadBtn>
					</label>
				) }
				{ HiddenInput }
			</Paper>
		</Box>
	)
}

export default UploadFileFromDevice