import UserControls from '../userControls/UserControls'
import HomeNavigation from './HomeNavigation'
import HomeBrand from './HomeBrand'
import { AppBar, Toolbar } from '@mui/material'

const HomeHeader = () => {
  const appBarStyle = {
    height: 80,
    display: 'flex',
    justifyContent: 'center',
  }
  return (
    <AppBar position="fixed" sx={appBarStyle}>
      <Toolbar sx={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr' }}>
        <HomeBrand />
        <HomeNavigation />
        <UserControls />
      </Toolbar>
    </AppBar>
  )
}

export default HomeHeader
