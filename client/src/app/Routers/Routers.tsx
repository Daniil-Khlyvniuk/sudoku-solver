import { Route, Routes } from 'react-router-dom'
import { ROUTES } from 'app/Routers/values'
import { MainPage, StatisticsPage } from 'pages'


const Routers = () => {
	return (
		<Routes>
			<Route path={ ROUTES.HOME } element={ <MainPage/> }/>
			<Route path={ ROUTES.STATISTICS } element={ <StatisticsPage/> }/>
		</Routes>
	)
}

export default Routers
