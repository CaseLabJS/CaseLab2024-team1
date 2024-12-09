import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { DocumentVersion } from '@/types/sharedTypes.ts'
import { DocumentItem } from '@/components/search/documentItem/documentItem.tsx'
import SearchOffIcon from '@mui/icons-material/SearchOff'

interface RenderDocumentItemsProps {
  documents: DocumentVersion[]
  isHistory: boolean
  handleClick: (document: DocumentVersion) => void
  searchQuery: string
}

export const renderDocumentItems = (props: RenderDocumentItemsProps) => {
  const { documents, isHistory, handleClick, searchQuery } = props
  return documents.map((document) => (
    <DocumentItem
      key={document.id}
      document={document}
      onClick={() => handleClick(document)}
      isHistory={isHistory}
      searchQuery={searchQuery}
    />
  ))
}

export const renderNoResults = (searchQuery: string) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '1rem',
    }}
  >
    <SearchOffIcon
      sx={{ color: 'grey.500', width: '2.5rem', height: '2.5rem' }}
    />
    <Typography>
      Нет результатов для <b>{searchQuery}</b>
    </Typography>
  </Box>
)

interface RenderRecentSearches {
  searchHistory: DocumentVersion[]
  searchQuery: string
}

export const renderRecentSearches = (props: RenderRecentSearches) => {
  const { searchHistory, searchQuery } = props
  if (!searchHistory.length && !searchQuery) {
    return (
      <Typography sx={{ fontSize: '0.8rem', color: 'grey.500' }}>
        Нет недавних запросов
      </Typography>
    )
  }
  return null
}
