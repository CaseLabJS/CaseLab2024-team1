import { DocumentTransitions } from '../types'

const transitions: DocumentTransitions[] = [
  DocumentTransitions.CREATED,
  DocumentTransitions.SIGNED_BY_AUTHOR,
  DocumentTransitions.MODIFIED,
]

export default Promise.resolve(() => transitions)
