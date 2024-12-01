import { NavigationType } from '@/components/appDashboardLayout/navigation/types.ts'
import { ToolbarButton } from '@/components/documentsList/types.ts'
import SaveAltIcon from '@mui/icons-material/SaveAlt'
import AssignmentIcon from '@mui/icons-material/Assignment'
import DeleteIcon from '@mui/icons-material/Delete'
import { Document } from '@/types/sharedTypes.ts'
import { useCallback, useMemo } from 'react'
import { base64ToFile } from '@/utils/base64ToFile.ts'
import documentsListStore from '@/stores/DocumentsListStore'
import { useNavigate } from 'react-router-dom'
import { useNotifications } from '@toolpad/core'

export const useActionButtons = (
  navigationType: NavigationType | null,
  document: Document,
  selectedVersionIndex: number
): ToolbarButton[] => {
  const { deleteDocument, countTotalDocuments, error } = documentsListStore

  const navigate = useNavigate()
  const notifications = useNotifications()

  const documentContent = document.documentVersions[selectedVersionIndex]
  const base64Content = documentContent.base64Content
  const file = base64ToFile(base64Content)

  const handleDownload = useCallback(() => {
    if (file) {
      const url = URL.createObjectURL(file)

      const a = window.document.createElement('a')
      a.href = url
      a.download = file.name

      window.document.body.appendChild(a)
      a.click()

      window.document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }
  }, [file])

  const handleDeleted = useCallback(async () => {
    await deleteDocument(document.id)

    if (!error) {
      await countTotalDocuments()
      notifications.show('Успешно удалено', {
        severity: 'success',
        autoHideDuration: 2000,
      })
      navigate('..')
    }
  }, [
    countTotalDocuments,
    deleteDocument,
    document.id,
    error,
    navigate,
    notifications,
  ])

  const actionButtons = useMemo(() => {
    switch (navigationType) {
      case NavigationType.NEW_DOCUMENT:
        return []

      case NavigationType.INBOX:
        return []

      case NavigationType.FORWARD:
        return [
          {
            content: <SaveAltIcon />,
            text: 'Скачать',
            onClick: handleDownload,
            disabled: !documentContent.base64Content?.split(',')[1],
          },
          {
            content: <AssignmentIcon />,
            text: 'Подписать',
            onClick: () => console.log(),
          },
          {
            content: <DeleteIcon />,
            text: 'Удалить',
            onClick: () => void handleDeleted(),
          },
        ]

      case NavigationType.DRAFT:
        return []

      case NavigationType.DELETED:
        return []

      case NavigationType.PROCESSING:
        return []

      case NavigationType.PROCESSED:
        return []

      default:
        return []
    }
  }, [
    navigationType,
    handleDownload,
    documentContent.base64Content,
    handleDeleted,
  ])

  return actionButtons
}
