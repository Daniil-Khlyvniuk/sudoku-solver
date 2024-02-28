import { Route, Routes } from 'react-router-dom'
import { ROUTES } from 'app/Routers/values'
import { MainPage, StatisticsPage } from 'pages'


const Routers = () => {
	return (
		<Routes>
			<Route path={ ROUTES.MAIN } element={ <MainPage/> }/>
			<Route path={ ROUTES.STATS } element={ <StatisticsPage/> }/>
		</Routes>
	)
}

export default Routers
