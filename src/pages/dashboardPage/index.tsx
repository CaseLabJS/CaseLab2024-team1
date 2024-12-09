import { PageContainer } from '@toolpad/core/PageContainer'
import { DashboardContent } from '@/components/dashboard/dashboardContent/dashboardContent.tsx'

export const DashboardPage = () => {
  return (
    <PageContainer
      breadcrumbs={[]}
      sx={{
        '&.MuiContainer-root': {
          maxWidth: 'none',
        },
      }}
    >
      <DashboardContent />
    </PageContainer>
  )
}
