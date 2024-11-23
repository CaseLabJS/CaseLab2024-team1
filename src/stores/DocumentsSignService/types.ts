import DocumentStore from '../DocumentStore'
import { SignService } from './SignService'
import SignatureRequestStore from '../SignatureRequestStore'

export interface DocumentWithSignature extends SignService, DocumentStore {}

export type SignatureRequestVersionMap = {
  [key: string]: SignatureRequestStore[]
}

export type GroupedSignatureRequests = {
  [key: string]: SignatureRequestVersionMap
}
