import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import { useCallback, useMemo, useState } from 'react'
import { Autocomplete } from '@/components/autocomplete/autocomplete.tsx'
import { observer } from 'mobx-react-lite'
import Tooltip from '@mui/material/Tooltip'
import SearchIcon from '@mui/icons-material/Search'
import { DocumentVersion } from '@/types/sharedTypes.ts'
import { SearchModal } from '@/components/search/searchModal/searchModal.tsx'
import searchStore from '@/stores/SearchStore'
import documentsListStore from '@/stores/DocumentsListStore'

export const Search = observer(() => {
  const {
    fetchAllDocuments,
    searchHistory,
    addToSearchHistory: storeAddToSearchHistory,
    allDocuments,
    loading,
  } = searchStore
  const { documentsSize, countTotalDocuments } = documentsListStore

  const [openModal, setOpenModal] = useState(false)

  const fetchAndCountDocuments = useCallback(async () => {
    if (!documentsSize) {
      await countTotalDocuments()
    }

    await fetchAllDocuments()
  }, [countTotalDocuments, documentsSize, fetchAllDocuments])

  const addToSearchHistory = useCallback(
    (value: DocumentVersion) => {
      storeAddToSearchHistory(value)
    },
    [storeAddToSearchHistory]
  )

  const documentOptions: DocumentVersion[] = useMemo(() => {
    return allDocuments.map((documentData) => {
      const lastVersion =
        documentData.documentVersions[documentData.documentVersions.length - 1]

      return {
        ...lastVersion,
        id: documentData.id,
      }
    })
  }, [allDocuments])

  const openSearchModal = useCallback(() => {
    setOpenModal(true)
    void fetchAndCountDocuments()
  }, [fetchAndCountDocuments])

  const closeSearchModal = useCallback(() => {
    setOpenModal(false)
  }, [])

  return (
    <>
      <Tooltip title="Search" enterDelay={1000}>
        <Box>
          <IconButton
            type="button"
            aria-label="search"
            sx={{
              display: { xs: 'flex', md: 'none' },
            }}
            onClick={openSearchModal}
          >
            <SearchIcon />
          </IconButton>
        </Box>
      </Tooltip>

      <Autocomplete
        options={documentOptions}
        placeholder="Поиск"
        id="document-autocomplete"
        displayFields={['title', 'description']}
        noOptionsText="Нет доступных документов"
        sx={{ minWidth: '18rem', display: { xs: 'none', md: 'inline-block' } }}
        isLoading={loading}
        onClick={() => void fetchAndCountDocuments()}
        onValueAdd={addToSearchHistory}
      />

      {openModal && (
        <SearchModal
          openModal={openModal}
          onCloseModal={closeSearchModal}
          options={documentOptions}
          searchHistory={searchHistory}
          displayFields={['title', 'description']}
          onValueAdd={addToSearchHistory}
        />
      )}
    </>
  )
})
