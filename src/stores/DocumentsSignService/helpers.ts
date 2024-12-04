import DocumentStore from '../DocumentStore'
import { SignService } from './SignService'
import { DocumentWithSignature, GroupedSignatureRequests } from './types'
import SignatureRequestStore from '../SignatureRequestStore'

export const combineDocumentWithSignature = (
  document: DocumentStore
): DocumentWithSignature => {
  return new Proxy(
    new SignService(document),
    proxyHandler<SignService>()
  ) as DocumentWithSignature
}

export const proxyHandler = <T extends { document: DocumentStore }>() => ({
  get: (target: T, prop: keyof T | keyof DocumentStore, receiver: unknown) => {
    if (prop in target) {
      return Reflect.get(target, prop, receiver)
    }
    if (prop in target.document) {
      const value: unknown = Reflect.get(target.document, prop)
      return value
    }
    return undefined
  },

  set: (
    target: T,
    prop: keyof T | keyof DocumentStore,
    value: unknown,
    receiver: unknown
  ) => {
    if (prop in target) {
      return Reflect.set(target, prop, value, receiver)
    }
    return Reflect.set(target.document, prop, value, receiver)
  },
})

export const groupSignatureRequests = (
  signatureRequests: SignatureRequestStore[]
) => {
  return signatureRequests.reduce<GroupedSignatureRequests>((acc, request) => {
    acc[request.documentId] ??= {}
    acc[request.documentId][request.documentVersionId] ??= []
    acc[request.documentId][request.documentVersionId].push(request)
    return acc
  }, {})
}

export const filterFulfilled = <T>(
  results: PromiseSettledResult<T>[]
): NonNullable<T>[] =>
  results
    .filter((result) => result.status === 'fulfilled')
    .map((result) => result.value)
    .filter((value) => value !== undefined && value !== null)
