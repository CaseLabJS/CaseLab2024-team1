import React, { useEffect } from 'react'
import { useNotifications } from '@toolpad/core'
import { useParams } from 'react-router-dom'
import documentsSignService, {
  DocumentWithSignature,
} from '@/stores/DocumentsSignService'

interface WithDocumentProps {
  document: DocumentWithSignature
}

export const withDocument = (
  WrappedComponent: React.ComponentType<WithDocumentProps>
) => {
  const HOC: React.FC = (props) => {
    const { id: documentId } = useParams<{ id: string }>()
    const { documents, error, fetchDocumentById } = documentsSignService
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

    if (!document) return null

    return <WrappedComponent {...props} document={document} />
  }

  return HOC
}
