import { Document, DocumentVersion } from '@/types/sharedTypes.ts'
import { useMemo } from 'react'
import { StatCardProps } from '@/components/dashboard/statCard/statCard.tsx'

export const useDocumentStats = (documents: Document[]): StatCardProps[] => {
  const calculateTrend = (currentValue: number): 'up' | 'down' | 'neutral' => {
    return currentValue > 0 ? 'up' : 'neutral'
  }

  return useMemo(() => {
    const currentDate = new Date()
    const currentYear = currentDate.getFullYear()
    const currentMonth = currentDate.getMonth()

    const isCurrentMonth = (date: string) => {
      const time = new Date(date)
      const timezoneOffset = time.getTimezoneOffset()
      const localTime = new Date(time.getTime() - timezoneOffset * 60000)
      return (
        localTime.getFullYear() === currentYear &&
        localTime.getMonth() === currentMonth
      )
    }

    const countDocuments = (
      documents: Document[],
      conditionFn: (doc: Document, version: DocumentVersion) => number
    ) => {
      return documents.reduce((acc, doc) => {
        return (
          acc +
          doc.documentVersions.reduce((versionAcc, version) => {
            return versionAcc + conditionFn(doc, version)
          }, 0)
        )
      }, 0)
    }

    const filesCount = countDocuments(documents, (_, version) =>
      isCurrentMonth(version.createdAt) && version.base64Content?.split(',')[1]
        ? 1
        : 0
    )

    const documentsVersionsCount = documents.reduce(
      (acc, document) => acc + document.documentVersions.length,
      0
    )

    const approvalsCount = countDocuments(documents, (_, lastVersion) =>
      isCurrentMonth(lastVersion.createdAt) && lastVersion.signatures
        ? lastVersion.signatures.length
        : 0
    )

    const commentedCount = documents.reduce((acc, doc) => {
      const commentsInCurrentMonth = doc.comments.filter((comment) => {
        const createdDate = new Date(comment.createdAt)
        const timezoneOffset = createdDate.getTimezoneOffset()
        const localTime = new Date(
          createdDate.getTime() - timezoneOffset * 60000
        )

        return (
          localTime.getFullYear() === currentYear &&
          localTime.getMonth() === currentMonth
        )
      })

      return acc + commentsInCurrentMonth.length
    }, 0)

    const generateDataArray = (
      dataType: 'files' | 'documentsVersions' | 'approvals' | 'comments'
    ) => {
      return Array.from({ length: 30 }, (_, index) => {
        const firstDateOfMonth = new Date()
        firstDateOfMonth.setMonth(currentMonth, 1)
        firstDateOfMonth.setHours(0, 0, 0, 0)

        const targetDate = new Date(firstDateOfMonth)
        targetDate.setDate(targetDate.getDate() + index)

        if (targetDate.getMonth() !== currentMonth) {
          return 0
        }

        const filteredDocs = documents.filter((doc) => {
          const lastVersion =
            doc.documentVersions[doc.documentVersions.length - 1]
          const createdDate = new Date(lastVersion.createdAt)
          const timezoneOffset = createdDate.getTimezoneOffset()
          const localTime = new Date(
            createdDate.getTime() - timezoneOffset * 60000
          )

          return (
            localTime.getFullYear() === targetDate.getFullYear() &&
            localTime.getMonth() === targetDate.getMonth() &&
            localTime.getDate() === targetDate.getDate()
          )
        })

        const filteredCommentsDocs = documents.filter((doc) => {
          return doc.comments.some((comment) => {
            const createdDate = new Date(comment.createdAt)
            const timezoneOffset = createdDate.getTimezoneOffset()
            const localTime = new Date(
              createdDate.getTime() - timezoneOffset * 60000
            )

            return (
              localTime.getFullYear() === targetDate.getFullYear() &&
              localTime.getMonth() === targetDate.getMonth() &&
              localTime.getDate() === targetDate.getDate()
            )
          })
        })

        if (dataType === 'files') {
          return filteredDocs.reduce((count, doc) => {
            return (
              count +
              doc.documentVersions.reduce((versionCount, version) => {
                return (
                  versionCount + (version.base64Content?.split(',')[1] ? 1 : 0)
                )
              }, 0)
            )
          }, 0)
        } else if (dataType === 'approvals') {
          return filteredDocs.reduce((count, doc) => {
            const lastVersion =
              doc.documentVersions[doc.documentVersions.length - 1]
            return (
              count +
              (lastVersion.signatures ? lastVersion.signatures.length : 0)
            )
          }, 0)
        } else if (dataType === 'comments') {
          return filteredCommentsDocs.reduce((count, doc) => {
            return (
              count +
              doc.comments.filter((comment) => {
                const createdDate = new Date(comment.createdAt)
                const timezoneOffset = createdDate.getTimezoneOffset()
                const localTime = new Date(
                  createdDate.getTime() - timezoneOffset * 60000
                )

                return (
                  localTime.getFullYear() === targetDate.getFullYear() &&
                  localTime.getMonth() === targetDate.getMonth() &&
                  localTime.getDate() === targetDate.getDate()
                )
              }).length
            )
          }, 0)
        } else if (dataType === 'documentsVersions') {
          return filteredDocs.reduce((count, doc) => {
            return count + doc.documentVersions.length
          }, 0)
        }

        return filteredDocs.length || 0
      })
    }

    const filesData = generateDataArray('files')
    const documentsVersionsData = generateDataArray('documentsVersions')
    const approvalsData = generateDataArray('approvals')
    const commentsData = generateDataArray('comments')

    const currentDay = currentDate.getDate()
    const indexToday = currentDay - 1

    return [
      {
        title: 'Приложенные файлы',
        value: `${filesCount}`,
        interval: 'Последние 30 дней',
        trend: calculateTrend(filesData[indexToday]),
        data: filesData,
        countToday: `${filesData[indexToday]} сегодня`,
      },
      {
        title: 'Версии документов',
        value: `${documentsVersionsCount}`,
        interval: 'Последние 30 дней',
        trend: calculateTrend(documentsVersionsData[indexToday]),
        data: documentsVersionsData,
        countToday: `${documentsVersionsData[indexToday]} сегодня`,
      },
      {
        title: 'Подписи к документам',
        value: `${approvalsCount}`,
        interval: 'Последние 30 дней',
        trend: calculateTrend(approvalsData[indexToday]),
        data: approvalsData,
        countToday: `${approvalsData[indexToday]} сегодня`,
      },
      {
        title: 'Добавленные комментарии',
        value: `${commentedCount}`,
        interval: 'Последние 30 дней',
        trend: calculateTrend(commentsData[indexToday]),
        data: commentsData,
        countToday: `${commentsData[indexToday]} сегодня`,
      },
    ]
  }, [documents])
}
