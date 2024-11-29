import { CreateDocumentForm } from '@/components/createDocumentForm/createDocumentForm.tsx'
import { PageContainer } from '@toolpad/core/PageContainer'

export const CreateDocumentPage = () => {
  return (
    <PageContainer
      breadcrumbs={[]}
      sx={{
        '&.MuiContainer-root': {
          maxWidth: 'none',
        },
      }}
    >
      <CreateDocumentForm />
    </PageContainer>
  )
}
