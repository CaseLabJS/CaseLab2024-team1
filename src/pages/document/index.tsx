import { Loader } from '@/components/loader'
import { DocumentForm } from '@/mock/documentForm/documentForm'
import { DocumentWithSignature } from '@/stores/DocumentsSignService'
import { useNotifications } from '@toolpad/core'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import documentsSignService from '@/stores/DocumentsSignService'

export const DocumentPage = () => {
  const { id: documentId } = useParams()
  const [document, setDocument] = useState<DocumentWithSignature | null>(null)
  const { loading, error, getDocumentById } = documentsSignService
  const notifications = useNotifications()

  useEffect(() => {
    const loadDocument = async () => {
      if (documentId) {
        const fetchedDocument = await getDocumentById(Number(documentId))
        setDocument(fetchedDocument)
      }
    }

    void loadDocument()
  }, [documentId, getDocumentById])

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
}
