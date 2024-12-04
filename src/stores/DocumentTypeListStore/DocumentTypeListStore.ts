import { SerializedError } from '@/api/core/serializedError'
import { documentTypesControllerApi } from '@/api/documentTypesController'
import DocumentTypeStore from '@/stores/DocumentTypeStore'
import { NewDocumentType } from '@/types/sharedTypes'
import { executeWithLoading } from '@/utils/executeWithLoading'
import { makeAutoObservable, runInAction } from 'mobx'

class DocumentTypeListStore {
  types: InstanceType<typeof DocumentTypeStore>[] = []
  loading: boolean = false
  error: SerializedError | null = null

  constructor() {
    makeAutoObservable(this)
  }

  async fetchDocumentTypes(params?: {
    showOnlyAlive?: boolean
    isAlive?: boolean
    page?: number
    size?: number
    ascending?: boolean
  }) {
    const fetchedTypes = await executeWithLoading(this, async () =>
      documentTypesControllerApi.getDocumentTypes(params)
    )

    if (fetchedTypes) {
      runInAction(() => {
        this.types = [
          ...fetchedTypes.map((type) => new DocumentTypeStore(type)),
        ]
      })
    }
  }

  async getDocumentTypeById(typeId: number) {
    const type = await executeWithLoading(this, () =>
      documentTypesControllerApi.getDocumentTypeById(typeId)
    )

    return type || null
  }

  async createDocumentType(type: NewDocumentType) {
    const newType = await executeWithLoading(this, () =>
      documentTypesControllerApi.createDocumentType(type)
    )

    if (newType) {
      runInAction(() => {
        this.types = [...this.types, new DocumentTypeStore(newType)]
      })
    }
  }

  async deleteDocumentType(typeId: number) {
    await executeWithLoading(this, () =>
      documentTypesControllerApi.deleteDocumentTypes(typeId)
    )

    if (!this.error) {
      runInAction(() => {
        this.types = [...this.types.filter((type) => type.data.id !== typeId)]
      })
    }
  }

  async recoverDocumentType(typeId: number) {
    await executeWithLoading(this, () =>
      documentTypesControllerApi.recover(typeId)
    )

    if (!this.error) {
      runInAction(() => {
        this.types = [...this.types.filter((type) => type.data.id !== typeId)]
      })
    }
  }
}

const documentTypeListStore = new DocumentTypeListStore()
export default documentTypeListStore
