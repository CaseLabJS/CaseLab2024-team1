import { makeAutoObservable } from 'mobx'
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

  async patchDocumentVersion(fields: Partial<DocumentVersionModel>) {
    const documentVersions = this.documentData.documentVersions
    const latestVersion = documentVersions[documentVersions.length - 1]

    if (latestVersion) {
      const patchedDocument = await executeWithLoading(this, () =>
        documentControllerApi.patchDocumentVersion(latestVersion.id, fields)
      )

      if (patchedDocument) {
        this.documentData = patchedDocument
      }
    } else {
      console.warn('No document versions available to patch.')
    }
  }

  async createDocumentVersion(documentVersion: DocumentVersionModel) {
    const createDocumentVersion = await executeWithLoading(this, () =>
      documentControllerApi.createDocumentVersion(
        this.documentData.id,
        documentVersion
      )
    )

    if (createDocumentVersion) {
      this.documentData = {
        ...this.documentData,
        documentVersions: [
          ...this.documentData.documentVersions,
          createDocumentVersion,
        ],
      }
    }
  }

  async addComment(comment: string) {
    const addedComment = await executeWithLoading(this, () =>
      documentControllerApi.addComment(this.documentData.id, comment)
    )

    if (addedComment) {
      this.documentData = {
        ...this.documentData,
        comments: [...this.documentData.comments, addedComment],
      }
    }
  }

  async recoverDocument() {
    await executeWithLoading(this, () =>
      documentControllerApi.recover(this.documentData.id)
    )
  }
}

export default DocumentStore
