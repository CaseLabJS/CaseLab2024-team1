import { DashboardLayout } from '@toolpad/core/DashboardLayout'
import { Outlet, useLocation } from 'react-router-dom'
import { Search } from '@/components/search/search.tsx'
import UserControls from '../userControls/UserControls'

export const AppDashboardLayout = () => {
  const location = useLocation()
  const isAppRoute = location.pathname.startsWith('/app')

  return (
    <DashboardLayout
      slots={{
        toolbarActions: isAppRoute ? Search : () => null,
        toolbarAccount: UserControls,
      }}
      sx={{
        '& .MuiDrawer-docked': {
          maxWidth: '230px',
          '& .MuiDrawer-paper': {
            maxWidth: '230px',
          },
        },
        '& .MuiAppBar-root': {
          '& .logoMain': {
            maxWidth: '40px',
          },
        },
        '& .MuiDrawer-root': {
          maxWidth: '270px',
          '& .MuiPaper-root': {
            maxWidth: '270px',
          },
        },
        '& >.MuiBox-root': {
          overflow: 'auto',
        },
        '& .MuiToolbar-root': {
          '& >.MuiStack-root': {
            alignItems: 'center',
          },
        },
      }}
    >
      <section className="main">
        <Outlet />
      </section>
    </DashboardLayout>
  )
}
