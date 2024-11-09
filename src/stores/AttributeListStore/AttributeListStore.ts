import { attributeControllerApi } from '@/api/attributeController'
import { SerializedError } from '@/api/core/serializedError'

import AttributeStore from '@/stores/AttributeStore'
import { NewAttribute } from '@/types/sharedTypes'
import { executeWithLoading } from '@/utils/executeWithLoading'
import { makeAutoObservable, runInAction } from 'mobx'

class AttributeListStore {
  attributes: InstanceType<typeof AttributeStore>[] = []
  loading: boolean = true
  error: SerializedError | null = null

  constructor() {
    makeAutoObservable(this)
  }

  async fetchAttributes() {
    const fetchedAttributes = await executeWithLoading(this, async () =>
      attributeControllerApi.getAttributes()
    )

    if (fetchedAttributes) {
      runInAction(() => {
        this.attributes = [
          ...fetchedAttributes.map(
            (attribute) => new AttributeStore(attribute)
          ),
        ]
      })
    }
  }

  async getAttributeById(attributeId: number) {
    const attribute = await executeWithLoading(this, async () =>
      attributeControllerApi.getAttributeById(attributeId)
    )

    return attribute || null
  }

  async createAttribute(attribute: NewAttribute) {
    const newAttribute = await executeWithLoading(this, async () =>
      attributeControllerApi.createAttribute(attribute)
    )

    if (newAttribute) {
      runInAction(
        () =>
          (this.attributes = [
            ...this.attributes,
            new AttributeStore(newAttribute),
          ])
      )
    }
  }

  async deleteAttribute(attributeId: number) {
    await executeWithLoading(this, () =>
      attributeControllerApi.deleteAttribute(attributeId)
    )

    runInAction(() => {
      this.attributes = [
        ...this.attributes.filter((attr) => attr.data.id !== attributeId),
      ]
    })
  }
}

const attributeListStore = new AttributeListStore()
export default attributeListStore
