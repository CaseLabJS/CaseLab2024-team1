import { useCallback } from 'react'
import { FormItem } from '@/components/createDocumentForm/types.ts'
import { Document, Value } from '@/types/sharedTypes.ts'
import { fileToBase64 } from '@/utils/fileToBase64.ts'
import documentsListStore from '@/stores/DocumentsListStore'
import authStore from '@/stores/AuthStore'
import DocumentStore from '@/stores/DocumentStore'

const { createDocument } = documentsListStore
const { user } = authStore

export const useDocumentActions = (
  draftDocument: DocumentStore | null,
  isDraft: boolean
) => {
  const convertAttributesToValues = useCallback(
    (attributes: Record<string, string>[]): Value[] => {
      const values: Value[] = []
      attributes.forEach((attribute) => {
        for (const [key, value] of Object.entries(attribute)) {
          values.push({ attributeName: key, value: value.trim() })
        }
      })

      return values
    },
    []
  )

  const updateDraftDocument = useCallback(
    async (document: FormItem) => {
      if (draftDocument && document.attributes) {
        const base64 = document.file ? await fileToBase64(document.file) : ''

        return await draftDocument.patchDocumentVersion(
          {
            title: document.title.trim() || 'Без названия',
            description: document.description,
            values: convertAttributesToValues(document.attributes),
            base64Content: base64,
          },
          !isDraft
        )
      }
    },
    [convertAttributesToValues, draftDocument, isDraft]
  )

  const createDocuments = useCallback(
    async (formItems: FormItem[]) => {
      const promises: Promise<void | Document>[] = []

      for (const document of formItems) {
        if (document.attributes && document.documentTypeId) {
          const base64 = document.file ? await fileToBase64(document.file) : ''

          promises.push(
            createDocument(
              {
                title: document.title.trim(),
                userId: user ? user.id : 0,
                documentTypeId: document.documentTypeId,
                description: document.description,
                values: convertAttributesToValues(document.attributes),
                base64Content: base64,
              },
              isDraft
            )
          )
        }
      }

      return await Promise.all(promises)
    },
    [convertAttributesToValues, isDraft]
  )

  return { updateDraftDocument, createDocuments }
}
