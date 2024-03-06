import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import MenuIcon from '@mui/icons-material/Menu'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { useState } from 'react'
import { logoImg } from 'assets/images'
import { colors } from 'assets/styles/colors'
import { container as containerStyles } from 'assets/styles/mixins'
import { ROUTES } from 'app/Routers/values'
import { Link } from 'react-router-dom'


export default function DrawerAppBar(props: Props) {
	const drawerWidth = 240
	const navItems = Object.entries(ROUTES)

	const { window } = props
	const [ mobileOpen, setMobileOpen ] = useState<boolean>(false)

	const handleDrawerToggle = () => {
		setMobileOpen((prevState) => !prevState)
	}

	const drawer = (
		<Box onClick={ handleDrawerToggle } sx={ { textAlign: 'center', bgcolor: colors.light_gray } }>
			<Typography variant="h1" sx={ { my: 2 } }>
				<img style={ { width: 40, display: 'block', margin: '0 auto' } } src={ logoImg } alt={ 'logo-img' }/>
			</Typography>
			<Divider/>
			<List>
				{ navItems.map((item) => (
					<ListItem key={ item[1] } disablePadding>
						<ListItemButton sx={ { textAlign: 'center' } }>

							<ListItemText sx={ { fontSize: '48px', fontWeight: 'bold' } } primary={ item[1] }>
								<Link to={ item[1] }>
									{ item[0] }
								</Link>
							</ListItemText>

						</ListItemButton>
					</ListItem>
				)) }
			</List>
		</Box>
	)

	const container = window !== undefined ? () => window().document.body : undefined

	return (
		<Box sx={ { display: 'flex' } }>
			<CssBaseline/>
			<AppBar component="nav" sx={ { bgcolor: colors.dark_gray } }>
				<Toolbar sx={ { ...containerStyles({}), display: 'flex' } }>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="start"
						onClick={ handleDrawerToggle }
						sx={ { mr: 2, display: { sm: 'none' } } }
					>
						<MenuIcon sx={ { width: '32px', height: '32px' } }/>
					</IconButton>
					<Typography
						variant="h6"
						component="div"
						sx={ { flexGrow: 1, display: { xs: 'none', sm: 'block' } } }
					>
						<img style={ { width: 48, display: 'block' } } src={ logoImg } alt={ 'logo-img' }/>
					</Typography>
					<Box sx={ { display: { xs: 'none', sm: 'block' } } }>
						{ navItems.map((item) => (
							<Button key={ item[1] } sx={ { color: colors.main_white, fontSize: 18, fontWeight: 'bold' } }>
								<Link to={ item[1] }>
									{ item[0] }
								</Link>
							</Button>
						)) }
					</Box>
				</Toolbar>
			</AppBar>
			<nav>
				<Drawer
					container={ container }
					variant="temporary"
					open={ mobileOpen }
					onClose={ handleDrawerToggle }
					ModalProps={ {
						keepMounted: true,
					} }
					sx={ {
						display: { xs: 'block', sm: 'none' },
						'& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, bgcolor: colors.light_gray },
					} }
				>
					{ drawer }
				</Drawer>
			</nav>
		</Box>
	)
}