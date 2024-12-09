import documentsListStore from '@/stores/DocumentsListStore'
import { GridPaginationModel } from '@mui/x-data-grid/models'

export const handlePaginationModelChange = (
  paginationModel: GridPaginationModel
) => {
  void documentsListStore.fetchDocuments({
    page: paginationModel.page,
    size: paginationModel.pageSize,
  })
}
