import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import Typography from '@mui/material/Typography'
import { StyledSwitch } from '@/components/styled/switch.tsx'
import { useTheme } from '@mui/material'
import { ChangeEvent, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { DocumentTransitions } from '@/api/documentController/types.ts'
import { observer } from 'mobx-react-lite'
import DocumentStore from '@/stores/DocumentStore'

interface DocumentHeaderProps {
  isChecked: boolean
  onChangeSwitch: (event: ChangeEvent<HTMLInputElement>) => void
  isLatestVersion?: boolean
  documentStore?: DocumentStore | null
}

export const DocumentHeader = observer((props: DocumentHeaderProps) => {
  const { isChecked, onChangeSwitch, isLatestVersion, documentStore } = props
  const theme = useTheme()
  const navigate = useNavigate()

  const handleClose = useCallback(() => {
    navigate('..')
  }, [navigate])

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <IconButton
          onClick={handleClose}
          sx={{
            backgroundColor:
              theme.palette.mode === 'dark' ? 'grey.800' : 'grey.200',
          }}
        >
          <KeyboardArrowLeftIcon />
        </IconButton>
        <Typography variant="body2" sx={{ m: 0 }}>
          В список документов
        </Typography>
      </Box>
      {documentStore &&
        documentStore.transitions?.includes(DocumentTransitions.MODIFIED) &&
        isLatestVersion && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <StyledSwitch checked={isChecked} onChange={onChangeSwitch} />
            <Typography
              variant="caption"
              sx={{
                m: 0,
                color: theme.palette.mode === 'dark' ? 'grey.400' : 'grey.600',
              }}
            >
              Редактировать
            </Typography>
          </Box>
        )}
    </Box>
  )
})
