import { Loader } from '@/components/loader'
import { DocumentViewForm } from '@/components/documentViewForm/documentViewForm'
import { useNotifications } from '@toolpad/core'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import DocumentStore from '@/stores/DocumentStore'
import documentsListStore from '@/stores/DocumentsListStore/DocumentsListStore'

export const DocumentPage = () => {
  const { id: documentId } = useParams()
  const [document, setDocument] = useState<DocumentStore | null>(null)
  const { loading, error, getDocumentById } = documentsListStore
  const notifications = useNotifications()

  useEffect(() => {
    const loadDocument = async () => {
      if (documentId) {
        const fetchedDocument = await getDocumentById(Number(documentId))
        if (fetchedDocument) {
          setDocument(fetchedDocument)
        }
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

  return <DocumentViewForm document={document} />
}
