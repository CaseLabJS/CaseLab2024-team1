import { makeAutoObservable } from 'mobx'
import { Signature, User } from '@/types/sharedTypes'
import { SerializedError } from '@/api/core/serializedError'
import { executeWithLoading } from '@/utils/executeWithLoading'
import {
  signatureControllerApi,
  SignatureModel,
  SignatureRequest,
  SignatureQueryParams,
} from '@/api/signatureController'

class SignatureRequestStore {
  id: number
  userTo: User
  documentId: number
  documentVersionId: number
  loading: boolean = false
  error: SerializedError | null = null

  constructor({ id, userTo, documentId, documentVersionId }: SignatureRequest) {
    this.id = id
    this.userTo = userTo
    this.documentId = documentId
    this.documentVersionId = documentVersionId
    makeAutoObservable(this)
  }

  sign = async (
    signatureModel: SignatureModel,
    params?: SignatureQueryParams
  ): Promise<void | Signature> => {
    return await executeWithLoading(this, () =>
      signatureControllerApi.sign(this.id, signatureModel, params)
    )
  }
}

export default SignatureRequestStore
