import DeleteIcon from '@mui/icons-material/Delete'
import { Document } from '@/types/sharedTypes.ts'
import { useCallback, useMemo } from 'react'
import { base64ToFile } from '@/utils/base64ToFile.ts'
import documentsListStore from '@/stores/DocumentsListStore'
import { useNavigate } from 'react-router-dom'
import { useNotifications } from '@toolpad/core'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { ToolbarButton } from '@/types/types.ts'
import { DocumentTransitions } from '@/api/documentController/types.ts'
import SaveAltIcon from '@mui/icons-material/SaveAlt'
import UnarchiveIcon from '@mui/icons-material/Unarchive'

export const useActionButtons = (
  transitions: DocumentTransitions[],
  document: Document,
  selectedVersionIndex: number,
  onPreview: (file: File) => void
): ToolbarButton[] => {
  const { deleteDocument, countTotalDocuments, error, recoverDocument } =
    documentsListStore

  const navigate = useNavigate()
  const notifications = useNotifications()

  const documentContent = document.documentVersions[selectedVersionIndex]
  const lastDocumentVersions =
    document.documentVersions[document.documentVersions.length - 1]
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

  const handleRecover = useCallback(async () => {
    navigate('..')
    await recoverDocument(document.id)

    if (!error) {
      await countTotalDocuments()
      notifications.show('Успешно восстановлено', {
        severity: 'success',
        autoHideDuration: 2000,
      })
    }
  }, [
    countTotalDocuments,
    document.id,
    error,
    navigate,
    notifications,
    recoverDocument,
  ])

  const handleDeleted = useCallback(async () => {
    navigate('..')
    await deleteDocument(document.id)

    if (!error) {
      await countTotalDocuments()
      notifications.show('Успешно удалено', {
        severity: 'success',
        autoHideDuration: 2000,
      })
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
    const buttons: ToolbarButton[] = []

    if (
      transitions.includes(DocumentTransitions.DELETED) &&
      lastDocumentVersions === documentContent
    ) {
      buttons.push({
        content: <DeleteIcon />,
        text: 'Удалить',
        onClick: () => void handleDeleted(),
        disabled:
          !transitions.includes(DocumentTransitions.DELETED) ||
          lastDocumentVersions !== documentContent,
      })
    }

    if (
      transitions.includes(DocumentTransitions.DRAFT) &&
      lastDocumentVersions === documentContent
    ) {
      buttons.push({
        content: <UnarchiveIcon />,
        text: 'Восстановить',
        onClick: () => void handleRecover(),
      })
    }

    if (documentContent.base64Content?.split(',')[1]) {
      buttons.push({
        content: <SaveAltIcon />,
        text: 'Скачать',
        onClick: handleDownload,
      })
    }

    if (!fileTypeCheck) {
      buttons.unshift({
        content: <VisibilityIcon />,
        text: 'Файл',
        onClick: handlePreview,
        disabled: false,
      })
    }

    return buttons
  }, [
    transitions,
    lastDocumentVersions,
    documentContent,
    handleDeleted,
    handleRecover,
    fileTypeCheck,
    handleDownload,
    handlePreview,
  ])

  return actionButtons
}
