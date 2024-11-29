import { AppProvider as ToolpadProvider } from '@toolpad/core/react-router-dom'
import {
  NAVIGATION,
  ADMIN_NAVIGATION,
} from '@/components/appDashboardLayout/navigation/navigation.tsx'
import logo from '@/assets/bird.svg'
import { theme } from '@/theme/theme.ts'
import { Outlet, useLocation } from 'react-router-dom'
import authStore from '@/stores/AuthStore'

export const AppProvider = () => {
  const { isAdmin } = authStore
  const location = useLocation()
  const isAppRoute = location.pathname.startsWith('/app')

  return (
    <ToolpadProvider
      navigation={
        isAdmin ? (isAppRoute ? NAVIGATION : ADMIN_NAVIGATION) : NAVIGATION
      }
      branding={{
        logo: (
          <img
            src={logo}
            alt="logo"
            width="100px"
            height="100px"
            className="logoMain"
          />
        ),
        title: 'TechDoc',
      }}
      theme={theme}
    >
      <Outlet />
    </ToolpadProvider>
  )
}
