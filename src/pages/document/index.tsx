import { Loader } from '@/components/loader'
import { DocumentForm } from '@/mock/documentForm/documentForm'
import { useNotifications } from '@toolpad/core'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import documentsSignService from '@/stores/DocumentsSignService'
import { observer } from 'mobx-react-lite'

export const DocumentPage = observer(() => {
  const { id: documentId } = useParams()
  const { documents, loading, error, fetchDocumentById } = documentsSignService
  const notifications = useNotifications()

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

  if (loading) return <Loader />
  if (!document) return null

  return <DocumentForm document={document} />
})
