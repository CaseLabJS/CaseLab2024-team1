import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { navigationLabels } from '@/components/appDashboardLayout/navigation/types.ts'
import Divider from '@mui/material/Divider'
import { DocumentVersion } from '@/types/sharedTypes.ts'
import { useLocation } from 'react-router-dom'
import { getNavigationType } from '@/components/appDashboardLayout/navigation/getNavigationType.ts'

interface DocumentInfoProps {
  documentVersions: DocumentVersion[]
  documentName: string
  userName: string
  userSurname: string
  selectedVersionIndex: number
}

export const DocumentInfo = (props: DocumentInfoProps) => {
  const {
    documentVersions,
    documentName,
    userName,
    userSurname,
    selectedVersionIndex,
  } = props

  const location = useLocation()
  const navigationType = getNavigationType(location.pathname)

  const documentTitle = documentVersions[selectedVersionIndex].title
  const documentDescription = documentVersions[selectedVersionIndex].description
  const documentCreatedAt = documentVersions[selectedVersionIndex].createdAt
  const documentSignatures = documentVersions[selectedVersionIndex].signatures

  return (
    <>
      <Box>
        <Typography variant="h5" sx={{ fontWeight: 600, pb: 1 }}>
          {navigationType ? navigationLabels[navigationType] : 'Документ'}{' '}
          {documentTitle}
        </Typography>
        <Divider sx={{ backgroundColor: 'primary.main' }} />
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        <Typography variant="body2" gutterBottom>
          {documentName} от{' '}
          {new Date(documentCreatedAt).toLocaleDateString('ru-RU')}
        </Typography>

        <Typography variant="body2" gutterBottom>
          Отправитель:{' '}
          <Typography variant="body2" component="span" fontWeight={700}>
            {userName} {userSurname}
          </Typography>
        </Typography>

        <Box sx={{ display: 'flex', gap: '0.2rem' }}>
          <Typography variant="body2" gutterBottom>
            Подписан:
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            {documentSignatures.length ? (
              documentSignatures.map((signature, index) => (
                <Box key={`signature ${index}`}>
                  <Typography key={signature.hash} variant="body2" gutterBottom>
                    <Typography
                      variant="body2"
                      component="span"
                      fontWeight={700}
                    >
                      {signature.user.name} {signature.user.surname}
                    </Typography>{' '}
                    ({signature.placeholderTitle}, {signature.user.email});
                  </Typography>
                </Box>
              ))
            ) : (
              <Typography variant="body2" gutterBottom>
                Нет подписей
              </Typography>
            )}
          </Box>
        </Box>

        {!!documentDescription && (
          <Typography variant="body2" gutterBottom>
            Описание: {documentDescription}
          </Typography>
        )}
      </Box>
    </>
  )
}
