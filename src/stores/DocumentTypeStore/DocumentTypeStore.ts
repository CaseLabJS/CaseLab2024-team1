import { documentTypesControllerApi } from '@/api/documentTypesController'
import { DocumentType, NewDocumentType } from '@/types/sharedTypes'
import { executeWithLoading } from '@/utils/executeWithLoading'
import { makeAutoObservable, runInAction } from 'mobx'

class DocumentTypeStore {
  data: DocumentType
  loading: boolean = false
  error: string | null = null

  constructor(documentData: DocumentType) {
    this.data = documentData
    makeAutoObservable(this)
  }

  async updateDocumentType(type: NewDocumentType) {
    const newType = await executeWithLoading(this, () =>
      documentTypesControllerApi.updateDocumentType(this.data.id, type)
    )

    if (newType) {
      runInAction(() => (this.data = newType))
    }
  }

  async pathDocumentType(type: Partial<NewDocumentType>) {
    const newType = await executeWithLoading(this, () =>
      documentTypesControllerApi.patchDocumentTypes(this.data.id, type)
    )

    if (newType) {
      runInAction(() => (this.data = newType))
    }
  }
}

export default DocumentTypeStore
