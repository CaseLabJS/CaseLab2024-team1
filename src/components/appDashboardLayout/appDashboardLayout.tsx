import { DashboardLayout } from '@toolpad/core/DashboardLayout'
import { Outlet } from 'react-router-dom'
import { Search } from '@/components/search/search.tsx'

export const AppDashboardLayout = () => {
  return (
    <DashboardLayout
      slots={{ toolbarActions: Search }}
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
          maxWidth: '230px',
          '& .MuiPaper-root': {
            maxWidth: '230px',
          },
        },
      }}
      s
    >
      <section className="main">
        <Outlet />
      </section>
    </DashboardLayout>
  )
}
