import { Loader } from '@/components/loader'
import { useNotifications } from '@toolpad/core'
import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import documentsSignService from '@/stores/DocumentsSignService'
import { observer } from 'mobx-react-lite'
import { DocumentDetails } from '@/components/documentDetails/documentDetails'
import { DocumentHeader } from '@/components/documentDetails/documentHeader/documentHeader'
import { Modal, Paper } from '@mui/material'
import styles from './documentPage.module.css'
import { SignatureBlock } from '@/components/signatureBlock'

export const DocumentPage = observer(() => {
  const { id: documentId } = useParams()
  const { documents, loading, error, fetchDocumentById } = documentsSignService
  const notifications = useNotifications()
  const navigate = useNavigate()
  const document = documentId ? documents[documentId] : null

  useEffect(() => {
    if (documentId) void fetchDocumentById(Number(documentId))
  }, [documentId, fetchDocumentById])

  useEffect(() => {
    if (error) {
      notifications.show(error.message, {
        severity: 'error',
        autoHideDuration: 2000,
      })
    }
  }, [error, notifications])

  const handleClose = () => {
    navigate('..')
  }

  if (loading) return <Loader />
  if (!document) return null

  return (
    <Modal open={!!documentId} onClose={handleClose}>
      <Paper
        className={styles.paper}
        sx={{
          minWidth: { lg: 1050, md: 850, sm: 550, xs: 380 },
          maxHeight: { md: 750, sm: 650, xs: 550 },
          padding: { lg: '3rem', md: '2.5rem', xs: '2rem' },
          '&.MuiPaper-root': {
            ':focus-visible': {
              outline: 'none',
            },
          },
        }}
      >
        <DocumentHeader isChecked={false} onChangeSwitch={() => {}} />

        {document && <DocumentDetails documentStore={document} />}
        <SignatureBlock document={document} />
      </Paper>
    </Modal>
  )
})
