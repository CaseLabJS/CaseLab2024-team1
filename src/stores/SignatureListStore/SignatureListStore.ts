import { makeAutoObservable, runInAction } from 'mobx'
import { SerializedError } from '@/api/core/serializedError'
import { executeWithLoading } from '@/utils/executeWithLoading'
import SignatureRequestStore from '../SignatureRequestStore'
import {
  signatureControllerApi,
  SignatureRequestModel,
  VoteModel,
  Signature,
  Vote,
  VoteCanceled,
  SignatureModel,
} from '@/api/signatureController'

class SignatureListStore {
  signatureRequests: InstanceType<typeof SignatureRequestStore>[] = []
  votes: Vote[] = []
  loading: boolean = false
  error: SerializedError | null = null

  constructor() {
    makeAutoObservable(this)
  }

  fetchSignatureRequests = async (): Promise<void> => {
    const fetchedSignatureRequests = await executeWithLoading(this, async () =>
      signatureControllerApi.getSignatureRequests()
    )

    if (fetchedSignatureRequests) {
      runInAction(() => {
        this.signatureRequests = fetchedSignatureRequests.map(
          (signatureRequest) => new SignatureRequestStore(signatureRequest)
        )
      })
    }
  }

  getSignatureRequestById = async (
    id: number
  ): Promise<void | SignatureRequestStore> => {
    const signatureRequestJson = await executeWithLoading(this, async () =>
      signatureControllerApi.getSignatureRequestById(id)
    )

    if (signatureRequestJson) {
      const signatureRequest = new SignatureRequestStore(signatureRequestJson)
      runInAction(() => {
        this.signatureRequests.push(signatureRequest)
      })
      return signatureRequest
    }
  }

  createSignatureRequest = async (
    signatureRequestModel: SignatureRequestModel
  ): Promise<SignatureRequestStore | null> => {
    const signatureRequest = await executeWithLoading(this, () =>
      signatureControllerApi.createSignatureRequest(signatureRequestModel)
    )

    if (!signatureRequest) return null

    const signatureRequestStore = new SignatureRequestStore(signatureRequest)
    runInAction(() => {
      this.signatureRequests.push(signatureRequestStore)
    })
    return signatureRequestStore
  }

  createVote = async (voteModel: VoteModel): Promise<void | Vote> => {
    return await executeWithLoading(this, () =>
      signatureControllerApi.createVote(voteModel)
    )
  }

  cancelVote = async (voteId: number): Promise<void | VoteCanceled> => {
    return await executeWithLoading(this, () =>
      signatureControllerApi.cancelVote(voteId)
    )
  }

  signDocumentByAuthor = async (
    documentId: number,
    signatureModel: SignatureModel
  ): Promise<void | Signature> => {
    return await executeWithLoading(this, () =>
      signatureControllerApi.sign(documentId, signatureModel, {
        signByRequest: false,
      })
    )
  }
}

const signatureListStore = new SignatureListStore()
export default signatureListStore
