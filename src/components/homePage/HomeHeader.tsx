import { AppBar, Box } from '@mui/material'
import Toolbar from '@mui/material/Toolbar'
import UserControls from '../userControls/UserControls'
import HomeNavigation from './HomeNavigation'
import HomeBrand from './HomeBrand'

const HomeHeader = () => {
  const appBarStyle = {
    height: 80,
    display: 'flex',
    justifyContent: 'center',
  }
  return (
    <AppBar position="fixed" sx={appBarStyle}>
      <Toolbar>
        <HomeBrand />
        <HomeNavigation />
        <Box sx={{ marginLeft: 'auto' }}>
          <UserControls />
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default HomeHeader
