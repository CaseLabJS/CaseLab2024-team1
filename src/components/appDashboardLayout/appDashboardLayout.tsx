import { DashboardLayout } from '@toolpad/core/DashboardLayout'
import { Outlet } from 'react-router-dom'
import { Search } from '@/components/search/search.tsx'
import authStore from '@/stores/AuthStore'

export const AppDashboardLayout = () => {
  return (
    <DashboardLayout
      slots={{
        toolbarActions: !authStore.isAdmin
          ? Search
          : () => <div>Guest Menu</div>,
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
      }}
    >
      <section className="main">
        <Outlet />
      </section>
    </DashboardLayout>
  )
}
