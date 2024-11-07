import { attributeControllerApi } from '@/api/attributeController'
import { SerializedError } from '@/api/core/serializedError'
import { Attribute, NewAttribute } from '@/types/sharedTypes'
import { executeWithLoading } from '@/utils/executeWithLoading'
import { makeAutoObservable, runInAction } from 'mobx'

class AttributeStore {
  data: Attribute
  loading: boolean = false
  error: SerializedError | null = null

  constructor(attribute: Attribute) {
    makeAutoObservable(this)

    this.data = attribute
  }

  async updateAttribute(attributeId: number, attribute: NewAttribute) {
    const updatedAttribute = await executeWithLoading(this, async () =>
      attributeControllerApi.updateAttribute(attributeId, attribute)
    )

    if (updatedAttribute) {
      runInAction(() => {
        this.data = updatedAttribute
      })
    }
  }

  async pathAttribute(attributeId: number, attribute: Partial<NewAttribute>) {
    const patchedAttribute = await executeWithLoading(this, async () =>
      attributeControllerApi.patchAttribute(attributeId, attribute)
    )

    if (patchedAttribute) {
      runInAction(() => (this.data = patchedAttribute))
    }
  }
}

export default AttributeStore
