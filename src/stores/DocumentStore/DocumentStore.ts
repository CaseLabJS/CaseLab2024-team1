import { makeAutoObservable, runInAction } from 'mobx'
import {
  documentControllerApi,
  DocumentVersionModel,
} from '@/api/documentController'
import { executeWithLoading } from '@/utils/executeWithLoading.ts'
import { Document } from '@/types/sharedTypes.ts'
import { SerializedError } from '@/api/core/serializedError.ts'

class DocumentStore {
  documentData: Document
  loading: boolean = false
  error: SerializedError | null = null

  constructor(document: Document) {
    makeAutoObservable(this)

    this.documentData = document
  }

  patchDocumentVersion = async (fields: Partial<DocumentVersionModel>) => {
    const patchedDocument = await executeWithLoading(this, () =>
      documentControllerApi.patchDocumentVersion(this.documentData.id, fields)
    )

    if (patchedDocument) {
      runInAction(() => {
        this.documentData = patchedDocument
      })
    }
  }

  createDocumentVersion = async (documentVersion: DocumentVersionModel) => {
    const createdDocumentVersion = await executeWithLoading(this, () =>
      documentControllerApi.createDocumentVersion(
        this.documentData.id,
        documentVersion
      )
    )

    if (createdDocumentVersion) {
      runInAction(() => {
        this.documentData = {
          ...this.documentData,
          documentVersions: [
            ...this.documentData.documentVersions,
            createdDocumentVersion,
          ],
        }
      })
    }
  }

  addComment = async (comment: string) => {
    const addedComment = await executeWithLoading(this, () =>
      documentControllerApi.addComment(this.documentData.id, comment)
    )

    if (addedComment) {
      runInAction(() => {
        this.documentData = {
          ...this.documentData,
          comments: [...this.documentData.comments, addedComment],
        }
      })
    }
  }

  recoverDocument = async () => {
    await executeWithLoading(this, () =>
      documentControllerApi.recover(this.documentData.id)
    )
  }
}

export default DocumentStore
