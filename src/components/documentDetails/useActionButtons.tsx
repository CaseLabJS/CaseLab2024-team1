import { NavigationType } from '@/components/appDashboardLayout/navigation/types.ts'
import SaveAltIcon from '@mui/icons-material/SaveAlt'
import AssignmentIcon from '@mui/icons-material/Assignment'
import DeleteIcon from '@mui/icons-material/Delete'
import { Document } from '@/types/sharedTypes.ts'
import { useCallback, useMemo } from 'react'
import { base64ToFile } from '@/utils/base64ToFile.ts'
import documentsListStore from '@/stores/DocumentsListStore'
import { useNavigate } from 'react-router-dom'
import { useNotifications } from '@toolpad/core'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { ToolbarButton } from '@/types/types.ts'

export const useActionButtons = (
  navigationType: NavigationType | null,
  document: Document,
  selectedVersionIndex: number,
  onPreview: (file: File) => void
): ToolbarButton[] => {
  const { deleteDocument, countTotalDocuments, error } = documentsListStore

  const navigate = useNavigate()
  const notifications = useNotifications()

  const documentContent = document.documentVersions[selectedVersionIndex]
  const base64Content = documentContent.base64Content
  const file = base64ToFile(base64Content)

  const fileTypeCheck = useMemo(() => {
    const isImage = file?.type.startsWith('image/')
    const isPdf = file?.type === 'application/pdf'
    return !(isImage || isPdf)
  }, [file])

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

  const handlePreview = useCallback(() => {
    if (file) {
      onPreview(file)
    }
  }, [file, onPreview])

  const actionButtons = useMemo(() => {
    switch (navigationType) {
      case NavigationType.INBOX:
        return []

      case NavigationType.FORWARD: {
        const buttons = [
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

        if (!fileTypeCheck) {
          buttons.unshift({
            content: <VisibilityIcon />,
            text: 'Файл',
            onClick: handlePreview,
          })
        }

        return buttons
      }

      default:
        return []
    }
  }, [
    navigationType,
    handleDownload,
    documentContent.base64Content,
    fileTypeCheck,
    handleDeleted,
    handlePreview,
  ])

  return actionButtons
}
