import { makeAutoObservable, runInAction } from 'mobx'
import {
  documentControllerApi,
  DocumentVersionModel,
} from '@/api/documentController'
import { executeWithLoading } from '@/utils/executeWithLoading.ts'
import { Document } from '@/types/sharedTypes.ts'
import { SerializedError } from '@/api/core/serializedError.ts'
import { DocumentTransitions } from '@/api/documentController/types.ts'

class DocumentStore {
  documentData: Document
  transitions: DocumentTransitions[] = []
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

  addDocumentComment = async (comment: string) => {
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

    return addedComment
  }

  getDocumentTransitions = async (isAlive?: boolean) => {
    const documentTransitions = await executeWithLoading(this, () =>
      documentControllerApi.getTransitions(this.documentData.id, {
        isAlive,
      })
    )

    if (documentTransitions) {
      runInAction(() => {
        this.transitions = documentTransitions
      })
    }
  }

  getDocumentVersion = async (versionId: number, isAlive?: boolean) => {
    return await executeWithLoading(this, () =>
      documentControllerApi.getDocumentVersion(
        this.documentData.id,
        versionId,
        {
          isAlive,
        }
      )
    )
  }
}

export default DocumentStore
