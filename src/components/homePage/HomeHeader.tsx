import UserControls from '../userControls/UserControls'
import HomeNavigation from './HomeNavigation'
import HomeBrand from './HomeBrand'
import { AppBar, Toolbar } from '@mui/material'

const HomeHeader: React.FC = () => {
  return (
    <AppBar
      position="fixed"
      sx={{ height: 80, display: 'flex', justifyContent: 'center' }}
    >
      <Toolbar sx={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr' }}>
        <HomeBrand />
        <HomeNavigation />
        <UserControls />
      </Toolbar>
    </AppBar>
  )
}

export default HomeHeader
