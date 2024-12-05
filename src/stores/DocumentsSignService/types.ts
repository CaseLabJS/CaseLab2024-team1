import DocumentStore from '../DocumentStore'
import { SignService } from './SignService'
import UserStore from '../UserStore'

export interface DocumentWithSignature extends SignService, DocumentStore {}

export type VersionGroup<T> = Record<string, Record<string, T>>

export type Censor = InstanceType<typeof UserStore>

export type StartVoteProps = {
  censors: Censor[]
  deadline: string | Date
  approvalThreshold: number
}
