import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react'
import documentsListStore from '@/stores/DocumentsListStore'
import Modal from '@mui/material/Modal'
import { observer } from 'mobx-react-lite'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import DocumentStore from '@/stores/DocumentStore'
import { DocumentHeader } from '@/components/documentDetails/documentHeader/documentHeader.tsx'
import { DocumentDetails } from '@/components/documentDetails/documentDetails.tsx'
import { getNavigationType } from '@/components/appDashboardLayout/navigation/getNavigationType.ts'
import { NavigationType } from '@/components/appDashboardLayout/navigation/types.ts'
import { Loader } from '@/components/loader'
import CreateDocumentVersion from '@/components/editDocument/CreateDocumentVersion'

export const DocumentPage = observer(() => {
  const { getDocumentById, loading } = documentsListStore

  const [documentStore, setDocumentStore] = useState<DocumentStore>()
  const [isChecked, setIsChecked] = useState(false)
  const [selectedVersionIndex, setSelectedVersionIndex] = useState(0)

  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const navigationType = getNavigationType(location.pathname)

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked)
  }, [])

  const handleClose = useCallback(() => {
    navigate('..')
  }, [navigate])

  useEffect(() => {
    if (!id) return
    void (async () => {
      let getDocument

      if (navigationType === NavigationType.DELETED) {
        getDocument = await getDocumentById(+id, false)
      } else {
        getDocument = await getDocumentById(+id)
      }
      setDocumentStore(getDocument)
    })()
  }, [getDocumentById, id, navigationType])

  useEffect(() => {
    if (documentStore) {
      const lastIndex = documentStore.documentData.documentVersions.length - 1
      setSelectedVersionIndex(lastIndex)
    }
  }, [documentStore])

  const handleVersionSelect = useCallback((index: number) => {
    setSelectedVersionIndex(index)
  }, [])

  const isLatestVersion = useMemo(() => {
    return (
      (documentStore &&
        selectedVersionIndex ===
          documentStore.documentData.documentVersions.length - 1) ||
      false
    )
  }, [documentStore, selectedVersionIndex])

  return (
    <Modal open={!!id} onClose={handleClose}>
      <Paper
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          minWidth: { lg: 1050, md: 850, sm: 550, xs: 380 },
          maxHeight: 650,
          overflow: 'auto',
          border: 'none',
          padding: { lg: '3rem', md: '2.5rem', xs: '2rem' },
          '&.MuiPaper-root': {
            ':focus-visible': {
              outline: 'none',
            },
            '&::-webkit-scrollbar': {
              width: '0.5rem',
            },
            '&::-webkit-scrollbar-thumb': {
              background: 'grey',
              borderRadius: '0.5rem',
            },
          },
        }}
      >
        <DocumentHeader
          isChecked={isChecked}
          onChangeSwitch={handleChange}
          isLatestVersion={isLatestVersion}
          documentStore={documentStore || null}
        />

        {loading && <Loader />}

        {documentStore && !isChecked && (
          <DocumentDetails
            documentStore={documentStore}
            selectedVersionIndex={selectedVersionIndex}
            onVersionSelect={handleVersionSelect}
          />
        )}
        {documentStore && isChecked && (
          <CreateDocumentVersion
            document={documentStore?.documentData}
            error={documentStore?.error}
            updateDocument={documentStore?.createDocumentVersion}
          />
        )}
      </Paper>
    </Modal>
  )
})
