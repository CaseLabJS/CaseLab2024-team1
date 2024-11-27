import { DocumentWithSignature } from '@/stores/DocumentsSignService'
import { User } from '@/types/sharedTypes'

export type SignatureBlockProps = {
  document: DocumentWithSignature
}

export type SignByReviewerProps = {
  document: DocumentWithSignature
}

export type SignByAuthorProps = {
  document: DocumentWithSignature
}

export enum Modes {
  Signature = 'signature',
  Vote = 'vote',
}

export type SignatureModeSelectorProps = {
  selectMode: (mode: Modes) => void
}

export type ManageCensorsListProps = {
  censors: User[]
  setCensors: (users: User[]) => void
  mode: Modes
}
