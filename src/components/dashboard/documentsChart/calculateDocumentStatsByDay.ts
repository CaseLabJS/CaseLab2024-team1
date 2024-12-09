import { Document } from '@/types/sharedTypes.ts'
import { DocumentTransitions } from '@/api/documentController/types.ts'
import authStore from '@/stores/AuthStore'

export const calculateDocumentStatsByDay = (
  documents: Document[],
  currentMonth: number
) => {
  const { user } = authStore
  const daysInMonth = new Date(
    new Date().getFullYear(),
    currentMonth + 1,
    0
  ).getDate()

  const modifiedData = Array.from({ length: daysInMonth }, () => 0)
  const createdData = Array.from({ length: daysInMonth }, () => 0)
  const signedData = Array.from({ length: daysInMonth }, () => 0)
  const sentData = Array.from({ length: daysInMonth }, () => 0)
  const approvedData = Array.from({ length: daysInMonth }, () => 0)
  const rejectedData = Array.from({ length: daysInMonth }, () => 0)

  documents.forEach((doc) => {
    const versionsCount = doc.documentVersions.length
    const lastVersion = doc.documentVersions[doc.documentVersions.length - 1]
    const date = new Date(lastVersion.createdAt)
    const timezoneOffset = date.getTimezoneOffset()
    const localTime = new Date(date.getTime() - timezoneOffset * 60000)

    if (versionsCount > 1) {
      if (localTime.getMonth() === currentMonth) {
        modifiedData[localTime.getDate() - 1]++
      }
    }

    if (doc.state === DocumentTransitions.SIGNED && doc.user.id !== user?.id) {
      if (localTime.getMonth() === currentMonth) {
        signedData[localTime.getDate() - 1]++
      }
    }

    if (doc.state === DocumentTransitions.SENT_ON_VOTING) {
      sentData[localTime.getDate() - 1]++
    }

    if (doc.state === DocumentTransitions.APPROVED_BY_VOTING) {
      approvedData[localTime.getDate() - 1]++
    }

    if (doc.state === DocumentTransitions.REJECTED_BY_VOTING) {
      rejectedData[localTime.getDate() - 1]++
    }

    if (
      doc.user.id === user?.id &&
      doc.state !== DocumentTransitions.MODIFIED
    ) {
      if (localTime.getMonth() === currentMonth) {
        createdData[localTime.getDate() - 1]++
      }
    }
  })

  return {
    modifiedData,
    createdData,
    signedData,
    sentData,
    approvedData,
    rejectedData,
  }
}
