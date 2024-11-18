import { BaseApi } from '../core/baseApi'
import { privateApi } from '../core/private.api'
import {
  Signature,
  SignatureQueryParams,
  SignatureRequest,
  SignatureRequestModel,
  SignatureModel,
  VoteModel,
  Vote,
  VoteCanceled,
} from './types'

const SERVICE_URL = '/sign'
class SignatureControllerApi extends BaseApi {
  createSignatureRequest = (signatureRequest: SignatureRequestModel) =>
    this.createRequest<SignatureRequest>({
      request: () => privateApi.post(`${SERVICE_URL}/send`, signatureRequest),
      mock: () => import('./mock/signature'),
    })

  getSignatureRequestById = (id: number) =>
    this.createRequest<SignatureRequest>({
      request: () => privateApi.get(`${SERVICE_URL}/${id}`),
      mock: () => import('./mock/signature'),
    })

  getSignatureRequests = () =>
    this.createRequest<SignatureRequest[]>({
      request: () => privateApi.get(SERVICE_URL),
      mock: async () => {
        const signature = await this.getSignatureRequestById(1)
        return () => [signature]
      },
    })

  sign = (
    signatureId: number,
    signature: SignatureModel,
    params?: SignatureQueryParams
  ) =>
    this.createRequest<Signature>({
      request: () =>
        privateApi.post(
          `${SERVICE_URL}/${signatureId}`,
          signature,
          params && { params }
        ),
    })

  createVote = (vote: VoteModel) =>
    this.createRequest<Vote>({
      request: () => privateApi.post(`${SERVICE_URL}/voting`, vote),
    })

  cancelVote = (id: number) =>
    this.createRequest<VoteCanceled>({
      request: () => privateApi.delete(`${SERVICE_URL}/voting/${id}/cancel`),
    })
}

export const signatureControllerApi = new SignatureControllerApi()
