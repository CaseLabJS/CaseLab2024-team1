import Card from '@mui/material/Card'
import { CardActions, useTheme } from '@mui/material'
import TextField from '@mui/material/TextField'
import SearchIcon from '@mui/icons-material/Search'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { ROUTES } from '@/router/constants.ts'
import Modal from '@mui/material/Modal'
import { ChangeEvent, useCallback, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DocumentVersion } from '@/types/sharedTypes.ts'
import {
  renderDocumentItems,
  renderNoResults,
  renderRecentSearches,
} from '@/components/search/searchModal/searchModalRenderers.tsx'

interface SearchModalProps {
  openModal: boolean
  onCloseModal: () => void
  options: DocumentVersion[]
  searchHistory: DocumentVersion[]
  displayFields: (keyof DocumentVersion)[]
  onValueAdd: (value: DocumentVersion) => void
}

export const SearchModal = (props: SearchModalProps) => {
  const {
    openModal,
    onCloseModal,
    options,
    searchHistory,
    displayFields,
    onValueAdd,
  } = props

  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()
  const theme = useTheme()

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setSearchQuery(e.target.value)
    },
    []
  )

  const filteredOptions = useMemo(() => {
    if (!searchQuery) return []

    return options.filter((option) =>
      displayFields.some((field) => {
        const value = option[field]
        return (
          typeof value === 'string' &&
          value.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })
    )
  }, [displayFields, options, searchQuery])

  const handleClick = useCallback(
    (documentInfo: DocumentVersion) => {
      onValueAdd(documentInfo)
      onCloseModal()
      navigate(`${ROUTES.app('forward')}/${documentInfo.id}`)
    },
    [onValueAdd, onCloseModal, navigate]
  )

  return (
    <Modal
      open={openModal}
      onClose={onCloseModal}
      slotProps={{
        backdrop: {
          timeout: 500,
          sx: {
            backdropFilter: 'blur(3px)',
            backgroundColor: 'rgba(0,0,0,0.5)',
          },
        },
      }}
    >
      <Card
        sx={{
          display: 'flex',
          flexDirection: 'column',
          position: 'absolute',
          top: '5%',
          left: '50%',
          transform: 'translate(-50%)',
          minWidth: { lg: 800, sm: 550, xs: 380 },
          maxHeight: 550,
          overflow: 'auto',
          border: 'none',
          '&.MuiPaper-root': {
            ':focus-visible': {
              outline: 'none',
            },
          },
          '&::-webkit-scrollbar': {
            width: '0.5rem',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'grey',
            borderRadius: '0.5rem',
          },
        }}
      >
        <CardActions>
          <TextField
            variant="standard"
            fullWidth
            placeholder="Что Вы ищите?"
            value={searchQuery}
            onChange={handleChange}
            slotProps={{
              input: {
                startAdornment: (
                  <SearchIcon sx={{ color: 'primary.dark', mr: 1 }} />
                ),
              },
            }}
            sx={{
              '& .MuiInputBase-root': {
                padding: '1rem',
              },
            }}
          />
        </CardActions>
        <CardContent sx={{ padding: '1rem 2rem' }}>
          <Typography
            sx={{
              fontSize: '0.6rem',
              color: theme.palette.mode === 'dark' ? 'grey.300' : 'grey.700',
              letterSpacing: '0.1rem',
              textTransform: 'uppercase',
              fontWeight: 700,
              pb: 1,
            }}
          >
            {!searchQuery ? 'Недавние' : 'Документы'}
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {searchQuery
              ? filteredOptions.length > 0
                ? renderDocumentItems({
                    documents: filteredOptions,
                    isHistory: false,
                    handleClick: handleClick,
                    searchQuery: searchQuery,
                  })
                : renderNoResults(searchQuery)
              : renderDocumentItems({
                  documents: searchHistory.slice(0, 5),
                  isHistory: true,
                  handleClick: handleClick,
                  searchQuery: searchQuery,
                })}

            {renderRecentSearches({ searchHistory, searchQuery })}
          </Box>
        </CardContent>
      </Card>
    </Modal>
  )
}
