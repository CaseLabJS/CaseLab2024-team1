import { alpha } from '@mui/material/styles'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { useTheme } from '@mui/material'
import { DocumentVersion } from '@/types/sharedTypes.ts'
import HistoryIcon from '@mui/icons-material/History'
import { formatDate } from '@/components/search/documentItem/formatDate.ts'
import { highlightText } from '@/components/search/documentItem/highlightText.tsx'
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn'

interface DocumentItemProps {
  document: DocumentVersion
  onClick: (id: number) => void
  isHistory?: boolean
  searchQuery: string
}

export const DocumentItem = (props: DocumentItemProps) => {
  const { document, onClick, isHistory, searchQuery } = props
  const theme = useTheme()

  return (
    <Box
      onClick={() => onClick(document.id)}
      sx={{
        display: 'flex',
        alignItems: 'center',
        padding: '1rem',
        cursor: 'pointer',
        backgroundColor: alpha(theme.palette.primary.light, 0.05),
        outline: `1px solid ${theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[200]}`,
        borderRadius: '0.5rem',
        justifyContent: 'space-between',
        '&:hover': {
          backgroundColor: alpha(theme.palette.primary.light, 0.15),
          outline: `1px solid ${theme.palette.mode === 'dark' ? theme.palette.primary.dark : theme.palette.primary.light}`,
          '.document-title, .document-description, .document-date, .document-icon':
            {
              color: 'primary.main',
            },
          '& .keyboard-return-icon': {
            opacity: 1,
            color: 'primary.main',
          },
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {isHistory ? (
          <HistoryIcon className="document-icon" sx={{ color: 'grey.500' }} />
        ) : (
          <InsertDriveFileIcon
            className="document-icon"
            sx={{ color: 'grey.600' }}
          />
        )}

        <Box>
          <Typography
            className="document-title"
            sx={{
              fontSize: '0.9rem',
              maxWidth: '15rem',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
            }}
          >
            {highlightText(document.title, searchQuery)}
          </Typography>
          <Typography
            className="document-description"
            sx={{
              fontSize: '0.8rem',
              color: 'grey.500',
              maxWidth: '20rem',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
            }}
          >
            {highlightText(document.description, searchQuery)}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <KeyboardReturnIcon
          className="keyboard-return-icon"
          sx={{ opacity: 0 }}
        />
        <Typography
          className="document-date"
          sx={{
            fontSize: '0.75rem',
            color: theme.palette.mode === 'dark' ? 'grey.500' : 'grey.700',
          }}
        >
          {formatDate(document.createdAt)}
        </Typography>
      </Box>
    </Box>
  )
}
