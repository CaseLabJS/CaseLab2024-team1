import {
  DataGrid,
  GridColDef,
  GridPagination,
  GridValidRowModel,
} from '@mui/x-data-grid'
import { useCallback, useState } from 'react'
import { GridRowSelectionModel } from '@mui/x-data-grid/models/gridRowSelectionModel'
import { GridRowId } from '@mui/x-data-grid/models/gridRows'
import Paper from '@mui/material/Paper'
import { Outlet } from 'react-router-dom'
import { GridToolbar } from '@/components/deletedDocs/gridToolbar.tsx'
import { useTheme } from '@mui/material'
import { alpha } from '@mui/material/styles'
import { GridPaginationModel } from '@mui/x-data-grid/models/gridPaginationProps'
import { ToolbarButton } from '@/types/types'

export const DEFAULT_PAGE_SIZE = 15
export const DEFAULT_PAGE = 0
const DEFAULT_PAGINATION_OPTIONS = [15, 30, 40]

interface DeletedDocsProps<T extends GridValidRowModel> {
  rows: T[]
  columns: GridColDef<T>[]
  totalDocuments: number
  initialPage?: number
  initialPageSize?: number
  paginationOption?: number[]
  buttons?: ToolbarButton[]
  selectionModel?: GridRowId[]
  onSelectionChange?: (newSelectionModel: GridRowSelectionModel) => void
  onPaginationModelChange?: (paginationModel: GridPaginationModel) => void
}

export const DeletedDocs = <T extends GridValidRowModel>(
  props: DeletedDocsProps<T>
) => {
  const {
    rows,
    columns,
    totalDocuments,
    initialPage = DEFAULT_PAGE,
    initialPageSize = DEFAULT_PAGE_SIZE,
    paginationOption = DEFAULT_PAGINATION_OPTIONS,
    buttons,
    selectionModel,
    onSelectionChange,
    onPaginationModelChange,
  } = props

  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: initialPage,
    pageSize: initialPageSize,
  })

  const theme = useTheme()

  const handleRowSelectionModelChange = useCallback(
    (newSelectionModel: GridRowSelectionModel) => {
      if (onSelectionChange) {
        onSelectionChange(newSelectionModel)
      }
    },
    [onSelectionChange]
  )

  const handlePaginationModelChange = useCallback(
    (paginationModel: GridPaginationModel) => {
      setPaginationModel(paginationModel)
      if (onPaginationModelChange) {
        onPaginationModelChange(paginationModel)
      }
    },
    [onPaginationModelChange]
  )

  return (
    <>
      <Paper>
        <DataGrid
          rows={rows}
          columns={columns}
          paginationMode="server"
          paginationModel={paginationModel}
          onPaginationModelChange={handlePaginationModelChange}
          rowCount={totalDocuments}
          pageSizeOptions={paginationOption}
          checkboxSelection
          disableColumnMenu
          disableRowSelectionOnClick
          onRowSelectionModelChange={handleRowSelectionModelChange}
          rowSelectionModel={selectionModel}
          localeText={{
            footerRowSelected: (count) => `${count} выбрано`,
            noResultsOverlayLabel: 'Нет результатов',
            toolbarColumns: 'Столбцы',
            toolbarColumnsLabel: 'Управление столбцами',
            toolbarFilters: 'Фильтры',
            toolbarFiltersLabel: 'Фильтры',
            toolbarExport: 'Экспорт',
            toolbarExportLabel: 'Экспортировать',
            toolbarExportCSV: 'Экспорт в CSV',
            toolbarExportPrint: 'Печать',
            toolbarExportExcel: 'Экспорт в Excel',
          }}
          slots={{
            pagination: (props) => (
              <GridPagination
                {...props}
                labelDisplayedRows={({ from, to, count }) => {
                  return ` ${from}-${to} из ${count}`
                }}
                labelRowsPerPage="Документов на странице:"
              />
            ),
            toolbar: () => <GridToolbar buttons={buttons} />,
          }}
          sx={{
            '--DataGrid-overlayHeight': '300px',
            '& .MuiDataGrid-cell': {
              '&:focus': {
                outline: 'none',
              },
            },
            '& .MuiDataGrid-row': {
              '&:hover': {
                boxShadow: theme.shadows[3],
              },
              '&:focus-within': {
                backgroundColor: alpha(theme.palette.primary.main, 0.1),
              },
            },
          }}
        />
      </Paper>
      <Outlet />
    </>
  )
}
