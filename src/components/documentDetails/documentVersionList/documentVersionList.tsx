import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import HistoryIcon from '@mui/icons-material/History'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material'
import { DocumentVersion } from '@/types/sharedTypes.ts'
import { useCallback, useState } from 'react'

interface DocumentVersionListProps {
  documentVersions: DocumentVersion[]
  onVersionSelect: (index: number) => void
  selectedVersionIndex: number
}

export const DocumentVersionList = (props: DocumentVersionListProps) => {
  const { documentVersions, onVersionSelect, selectedVersionIndex } = props
  const theme = useTheme()

  const [openDocumentVersions, setOpenDocumentVersions] = useState(false)

  const handleToggle = useCallback(() => {
    setOpenDocumentVersions((prev) => !prev)
  }, [])

  return (
    <Box
      sx={{
        maxHeight: '10rem',
        overflow: 'auto',
        '&::-webkit-scrollbar': {
          width: '0.5rem',
        },
        '&::-webkit-scrollbar-thumb': {
          background: 'grey',
          borderRadius: '0.5rem',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        <IconButton onClick={handleToggle}>
          {openDocumentVersions ? (
            <KeyboardArrowDownIcon />
          ) : (
            <KeyboardArrowRightIcon />
          )}
        </IconButton>
        <Typography
          variant="body2"
          sx={{
            color: theme.palette.mode === 'dark' ? 'grey.400' : 'grey.600',
          }}
        >
          Показать версии документа ({documentVersions.length})
        </Typography>
      </Box>

      {openDocumentVersions && (
        <Box sx={{ pl: 5 }}>
          <Stepper activeStep={0} orientation="vertical">
            {documentVersions.map((version, index) => (
              <Step key={version.id}>
                <StepLabel
                  StepIconComponent={() => (
                    <HistoryIcon sx={{ color: 'grey.600' }} />
                  )}
                >
                  <Button
                    variant="text"
                    size="small"
                    onClick={() => onVersionSelect(index)}
                    disabled={selectedVersionIndex === index}
                  >
                    {version.title} (Создано:{' '}
                    {new Date(version.createdAt).toLocaleDateString('ru-RU')})
                  </Button>
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
      )}
    </Box>
  )
}
