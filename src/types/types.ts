import { ReactNode } from 'react'

export interface ToolbarButton {
  content: ReactNode
  text?: string
  onClick: () => Promise<void> | void
  disabled?: boolean
}
