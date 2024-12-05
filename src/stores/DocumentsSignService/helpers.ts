import DocumentStore from '../DocumentStore'
import { SignService } from './SignService'
import { DocumentWithSignature, VersionGroup } from './types'

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

export const groupByVersions = <
  T extends {
    documentId: number
    documentVersionId?: number
    documentVersion?: { id: number }
  },
>(
  values: T[]
) => {
  return values.reduce<VersionGroup<T[]>>((acc, value) => {
    const versionId = value.documentVersionId ?? value.documentVersion?.id ?? 0

    acc[value.documentId] ??= {}
    acc[value.documentId][versionId] ??= []
    acc[value.documentId][versionId].push(value)
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
