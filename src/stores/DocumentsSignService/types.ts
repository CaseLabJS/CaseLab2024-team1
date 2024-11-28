import DocumentStore from '../DocumentStore'
import { SignService } from './SignService'
import SignatureRequestStore from '../SignatureRequestStore'
import UserStore from '../UserStore'

export interface DocumentWithSignature extends SignService, DocumentStore {}

export type SignatureRequestVersionMap = {
  [key: string]: SignatureRequestStore[]
}

export type GroupedSignatureRequests = {
  [key: string]: SignatureRequestVersionMap
}

export type Censor = InstanceType<typeof UserStore>

export type StartVoteProps = {
  censors: Censor[]
  deadline: string | Date
  approvalThreshold: number
}
