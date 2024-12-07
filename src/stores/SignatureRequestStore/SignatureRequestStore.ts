import { makeAutoObservable } from 'mobx'
import { Signature, User } from '@/types/sharedTypes'
import { SerializedError } from '@/api/core/serializedError'
import { executeWithLoading } from '@/utils/executeWithLoading'
import {
  signatureControllerApi,
  SignatureModel,
  SignatureRequest,
  SignatureQueryParams,
  SignatureRequestStatus,
} from '@/api/signatureController'

class SignatureRequestStore {
  id!: number
  userTo!: User
  documentId!: number
  documentVersionId!: number
  status!: SignatureRequestStatus
  votingId!: number | null
  loading: boolean = false
  error: SerializedError | null = null

  constructor(signatureRequest: SignatureRequest) {
    Object.assign(this, signatureRequest)
    makeAutoObservable(this)
  }

  sign = async (
    signatureModel: SignatureModel,
    params?: SignatureQueryParams
  ): Promise<Signature | null> =>
    (await executeWithLoading(this, () =>
      signatureControllerApi.sign(this.id, signatureModel, params)
    )) || null
}

export default SignatureRequestStore
