import { useEffect, useState } from 'react'
import * as tf from '@tensorflow/tfjs';


const Statistics = () => {
	const [model, setModel] = useState<any>(null)

	useEffect(() => {
		tf.loadLayersModel('http://localhost:8080/static/trained_models/3_digit_classifier.json').then(res => {
			setModel(res)
		})
	}, [])

	console.log(model)
	return (
		<div>
			 Statistics Statistics Statistics Statistics Statistics vStatistics StatisticsStatistics Statistics Statistics
		</div>
	)
}

export default Statistics