import documentsListStore from '@/stores/DocumentsListStore'
import { GridRowId } from '@mui/x-data-grid'
import { useNotifications } from '@toolpad/core'
import { ToolbarButton } from '@/types/types'
import DeleteIcon from '@mui/icons-material/Delete'

interface UseToolbarButtonsProps {
  selectionModel: GridRowId[]
  buttonTypes: string[]
}

export const useToolbarButtons = ({
  selectionModel,
  buttonTypes,
}: UseToolbarButtonsProps) => {
  const notifications = useNotifications()
  const { deleteDocument, countTotalDocuments } = documentsListStore

  const handleDelete = async () => {
    const promises: Promise<void | Document>[] = []

    selectionModel.map((selectedId) => {
      promises.push(deleteDocument(+selectedId))
    })
    const results = await Promise.all(promises)
    await countTotalDocuments()

    if (selectionModel.some((_, index) => results[index])) {
      notifications.show('Ошибка при удалении', {
        severity: 'error',
        autoHideDuration: 5000,
      })
    } else {
      notifications.show('Успешно удалено', {
        severity: 'success',
        autoHideDuration: 2000,
      })
    }
  }

  const buttons: ToolbarButton[] = []

  if (buttonTypes.includes('delete')) {
    buttons.push({
      content: <DeleteIcon />,
      onClick: handleDelete,
      disabled: selectionModel.length === 0,
    })
  }

  return buttons
}
