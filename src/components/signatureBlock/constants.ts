import { Modes } from './types'

export const modesMap: Record<Modes, string> = {
  [Modes.Signature]: 'Запросить подпись',
  [Modes.Vote]: 'Создать голосование',
}

export const menuPositionConfig = {
  anchorOrigin: {
    vertical: 'bottom' as const,
    horizontal: 'right' as const,
  },
  transformOrigin: {
    vertical: 'bottom' as const,
    horizontal: 'left' as const,
  },
}

const tomorrow = new Date()
tomorrow.setDate(tomorrow.getDate() + 1)

export const initialVoteFormValues = {
  deadline: tomorrow.toLocaleDateString('en-CA'),
  approvalThreshold: 50,
}
