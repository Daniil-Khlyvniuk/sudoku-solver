import React from 'react'
import GlobalStyles from 'assets/styles/global'
import { Routers } from 'app/Routers'
import { BrowserRouter } from 'react-router-dom'


const App = () => {
	return (
		<BrowserRouter>
			<GlobalStyles/>
			<Routers/>
		</BrowserRouter>
	)
}

export default App
