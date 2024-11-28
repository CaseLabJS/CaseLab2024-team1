import { DocumentWithSignature } from '@/stores/DocumentsSignService'
import UserStore from '@/stores/UserStore'
import { SxProps, Theme } from '@mui/system'

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

export type Censor = InstanceType<typeof UserStore>

export type CensorsListMenuProps = {
  render: (arg0: Censor[]) => JSX.Element
  anchorEl: HTMLElement | null
  setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>
}

export type CensorsListProps = {
  sx?: SxProps<Theme>
  censors: Censor[]
  onCensorSelect: (censor: Censor) => void
  selected: boolean
}

export type VoteFormValues = {
  deadline: string
  approvalThreshold: number
}

export type VoteFormProps = {
  startVote: (formValues: VoteFormValues) => void
  disabled: boolean
}
