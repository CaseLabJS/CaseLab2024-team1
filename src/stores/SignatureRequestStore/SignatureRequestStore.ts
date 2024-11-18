import { makeAutoObservable } from 'mobx'
import { Signature, User } from '@/types/sharedTypes'
import { SerializedError } from '@/api/core/serializedError'
import { executeWithLoading } from '@/utils/executeWithLoading'
import {
  signatureControllerApi,
  SignatureModel,
  SignatureRequest,
} from '@/api/signatureController'

class SignatureRequestStore {
  id: number
  userTo: User
  documentVersionId: number
  loading: boolean = false
  error: SerializedError | null = null

  constructor({ id, userTo, documentVersionId }: SignatureRequest) {
    this.id = id
    this.userTo = userTo
    this.documentVersionId = documentVersionId
    makeAutoObservable(this)
  }

  sign = async (signatureModel: SignatureModel): Promise<void | Signature> => {
    return await executeWithLoading(this, () =>
      signatureControllerApi.sign(this.id, signatureModel)
    )
  }
}

export default SignatureRequestStore
