import { DocumentStatus } from '../types'

const status: DocumentStatus[] = [
  DocumentStatus.CREATED,
  DocumentStatus.SIGNED_BY_AUTHOR,
  DocumentStatus.MODIFIED,
]

export default Promise.resolve(() => status)
