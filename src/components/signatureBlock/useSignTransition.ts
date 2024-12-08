import { DocumentWithSignature } from '@/stores/DocumentsSignService'
import { useEffect } from 'react'

export const useSignTransition = (document: DocumentWithSignature) => {
  useEffect(() => {
    if (document.transitions.length === 0) {
      void document.getDocumentTransitions()
    }
  }, [document])

  return true
}
