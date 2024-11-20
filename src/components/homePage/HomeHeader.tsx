import UserControls from '../userControls/UserControls'
import HomeNavigation from './HomeNavigation'
import HomeBrand from './HomeBrand'
import ThemeSwitch from '../themeSwitch/ThemeSwitch'
import { AppBar, Toolbar, Box } from '@mui/material'
const HomeHeader: React.FC = () => {
  return (
    <AppBar
      position="fixed"
      sx={{ height: 80, display: 'flex', justifyContent: 'center' }}
    >
      <Toolbar sx={{ display: 'grid', gridTemplateColumns: '1fr 8fr 1fr' }}>
        <HomeBrand />
        <HomeNavigation />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <ThemeSwitch />
          <UserControls />
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default HomeHeader
