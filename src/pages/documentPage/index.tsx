import { useNavigate, useParams } from 'react-router-dom'
import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import documentsListStore from '@/stores/DocumentsListStore'
import Modal from '@mui/material/Modal'
import { observer } from 'mobx-react-lite'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import DocumentStore from '@/stores/DocumentStore'
import { DocumentHeader } from '@/components/documentDetails/documentHeader/documentHeader.tsx'
import { DocumentDetails } from '@/components/documentDetails/documentDetails.tsx'
import CreateDocumentVersion from '@/components/editDocument/CreateDocumentVersion'

export const DocumentPage = observer(() => {
  const { getDocumentById, loading } = documentsListStore

  const [documentStore, setDocumentStore] = useState<DocumentStore>()
  const [isChecked, setIsChecked] = useState(false)

  const { id } = useParams()
  const navigate = useNavigate()

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked)
  }, [])

  const handleClose = useCallback(() => {
    navigate('..')
  }, [navigate])

  useEffect(() => {
    if (!id) return
    void (async () => {
      const getDocument = await getDocumentById(+id)
      setDocumentStore(getDocument)
    })()
  }, [getDocumentById, id])

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
          maxHeight: { md: 750, sm: 650, xs: 550 },
          overflow: 'auto',
          border: 'none',
          padding: { lg: '3rem', md: '2.5rem', xs: '2rem' },
          '&.MuiPaper-root': {
            ':focus-visible': {
              outline: 'none',
            },
          },
        }}
      >
        <DocumentHeader isChecked={isChecked} onChangeSwitch={handleChange} />

        {loading && (
          <Typography variant="body2" sx={{ textAlign: 'center' }}>
            Загрузка документа...
          </Typography>
        )}

        {documentStore && !isChecked && (
          <DocumentDetails documentStore={documentStore} />
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
