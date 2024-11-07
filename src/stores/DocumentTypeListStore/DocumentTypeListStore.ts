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

  async fetchDocumentTypes() {
    const fetchedTypes = await executeWithLoading(this, async () =>
      documentTypesControllerApi.getDocumentTypes()
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

    runInAction(() => {
      this.types = [...this.types.filter((type) => type.data.id !== typeId)]
    })
  }
}

const documentTypeListStore = new DocumentTypeListStore()
export default documentTypeListStore
