import { AppProvider as ToolpadProvider } from '@toolpad/core/react-router-dom'
import { NAVIGATION } from '@/components/appDashboardLayout/navigation/navigation.tsx'
import logo from '@/assets/rb_1741.png'
import { theme } from '@/theme/theme.ts'
import { Outlet } from 'react-router-dom'
import {useAuth} from "@/hooks/useAuth.tsx";

export const AppProvider = () => {
  const { session, authentication } = useAuth();

  return (
    <ToolpadProvider
      //TODO здесь может быть отдельная навигация для admin
      navigation={NAVIGATION}
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
      session={session}
      authentication={authentication}
    >
      <Outlet />
    </ToolpadProvider>
  )
}
