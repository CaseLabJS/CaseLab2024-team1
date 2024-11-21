import { makeAutoObservable, runInAction } from 'mobx'
import { SerializedError } from '@/api/core/serializedError'
import { executeWithLoading } from '@/utils/executeWithLoading'
import SignatureRequestStore from '../SignatureRequestStore'
import {
  signatureControllerApi,
  SignatureRequestModel,
  VoteModel,
  Signature,
  SignatureRequest,
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

  async fetchSignatureRequests(): Promise<void> {
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

  async getSignatureRequestById(id: number): Promise<void | SignatureRequest> {
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

  async createSignatureRequest(
    signatureRequestModel: SignatureRequestModel
  ): Promise<void | SignatureRequest> {
    const signatureRequest = await executeWithLoading(this, () =>
      signatureControllerApi.createSignatureRequest(signatureRequestModel)
    )

    if (signatureRequest) {
      runInAction(() => {
        this.signatureRequests.push(new SignatureRequestStore(signatureRequest))
      })
    }
  }

  async createVote(voteModel: VoteModel): Promise<void | Vote> {
    return await executeWithLoading(this, () =>
      signatureControllerApi.createVote(voteModel)
    )
  }

  async cancelVote(voteId: number): Promise<void | VoteCanceled> {
    return await executeWithLoading(this, () =>
      signatureControllerApi.cancelVote(voteId)
    )
  }

  async signDocumentByAuthor(
    documentId: number,
    signatureModel: SignatureModel
  ): Promise<void | Signature> {
    return await executeWithLoading(this, () =>
      signatureControllerApi.sign(documentId, signatureModel, {
        signByRequest: true,
      })
    )
  }
}

const signatureListStore = new SignatureListStore()
export default signatureListStore
