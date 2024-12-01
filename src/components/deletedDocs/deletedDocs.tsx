import { DataGrid, GridColDef, GridValidRowModel } from '@mui/x-data-grid'
import { useCallback } from 'react'
import { GridRowSelectionModel } from '@mui/x-data-grid/models/gridRowSelectionModel'
import Paper from '@mui/material/Paper'
import { Outlet } from 'react-router-dom'
import { GridToolbar } from '@/components/deletedDocs/gridToolbar.tsx'
import { useTheme } from '@mui/material'
import { alpha } from '@mui/material/styles'
import { ToolbarButton } from '@/types/types'

interface DeletedDocsProps<T extends GridValidRowModel> {
  rows: T[]
  columns: GridColDef<T>[]
  buttons?: ToolbarButton[]
  onSelectionChange?: (newSelectionModel: GridRowSelectionModel) => void
}

export const DeletedDocs = <T extends GridValidRowModel>(
  props: DeletedDocsProps<T>
) => {
  const { rows, columns, buttons, onSelectionChange } = props

  const theme = useTheme()

  const handleRowSelectionModelChange = useCallback(
    (newSelectionModel: GridRowSelectionModel) => {
      if (onSelectionChange) {
        onSelectionChange(newSelectionModel)
      }
    },
    [onSelectionChange]
  )

  return (
    <>
      <Paper>
        <DataGrid
          rows={rows}
          columns={columns}
          checkboxSelection
          disableColumnMenu
          disableRowSelectionOnClick
          onRowSelectionModelChange={handleRowSelectionModelChange}
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
