import { AiModel } from 'backends/db-backend/src/ai-model/ai-model.schema'


interface SudokuResponse {
	name?: string
	initialImageLink: string
	completeImageLink: string
	filledCompleteMatrix: number[][]
	digitsDetectorModel: AiModel
	elapsedTime: number
	createdAt: Date
}