import {
  DataGrid,
  GridColDef,
  GridPagination,
  GridRowParams,
  GridValidRowModel,
} from '@mui/x-data-grid'
import { useCallback, useMemo, useState } from 'react'
import { GridRowSelectionModel } from '@mui/x-data-grid/models/gridRowSelectionModel'
import { GridRowId } from '@mui/x-data-grid/models/gridRows'
import Paper from '@mui/material/Paper'
import { Outlet } from 'react-router-dom'
import { GridToolbar } from '@/components/documentsList/gridToolbar.tsx'
import { useTheme } from '@mui/material'
import { alpha } from '@mui/material/styles'
import { GridPaginationModel } from '@mui/x-data-grid/models/gridPaginationProps'
import { ToolbarButton } from '@/types/types'
import { GridFeatureMode } from '@mui/x-data-grid/models/gridFeatureMode'
import { observer } from 'mobx-react-lite'

export const DEFAULT_PAGE_SIZE = 15
export const DEFAULT_PAGE = 0
const DEFAULT_PAGINATION_OPTIONS = [15, 30, 40]

interface DocumentsListProps<T extends GridValidRowModel> {
  rows: T[]
  columns: GridColDef<T>[]
  totalDocuments?: number
  initialPage?: number
  initialPageSize?: number
  paginationOption?: number[]
  buttons?: ToolbarButton[]
  selectionModel?: GridRowId[]
  onSelectionChange?: (newSelectionModel: GridRowSelectionModel) => void
  onPaginationModelChange?: (paginationModel: GridPaginationModel) => void
  paginationMode?: GridFeatureMode
  onRowClick?: (params: GridRowParams) => void
  loading?: boolean
  checkboxSelection?: boolean
}

export const DocumentsList = observer(
  <T extends GridValidRowModel>(props: DocumentsListProps<T>) => {
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
      paginationMode = 'server',
      onRowClick,
      loading,
      checkboxSelection = true,
    } = props

    const [paginationModel, setPaginationModel] = useState<GridPaginationModel>(
      {
        page: initialPage,
        pageSize: initialPageSize,
      }
    )

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

    const rowCount = useMemo(() => {
      if (paginationMode === 'server') {
        return totalDocuments
      }

      return
    }, [paginationMode, totalDocuments])

    return (
      <>
        <Paper sx={{ width: '100%', maxHeight: '54rem' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            loading={loading}
            paginationMode={paginationMode}
            paginationModel={paginationModel}
            onPaginationModelChange={handlePaginationModelChange}
            rowCount={rowCount}
            pageSizeOptions={paginationOption}
            checkboxSelection={checkboxSelection}
            disableColumnMenu
            disableRowSelectionOnClick
            disableVirtualization
            onRowSelectionModelChange={handleRowSelectionModelChange}
            rowSelectionModel={selectionModel}
            onRowClick={onRowClick}
            localeText={{
              footerRowSelected: (count) => `${count} выбрано`,
              noRowsLabel: 'Документов нет',
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
            slotProps={{
              loadingOverlay: {
                variant: 'skeleton',
                noRowsVariant: 'skeleton',
              },
              toolbar: {
                showQuickFilter: true,
              },
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
              '& .MuiDataGrid-scrollbar': {
                '&::-webkit-scrollbar': {
                  width: '0.4rem',
                  height: '0.4rem',
                },
                '&::-webkit-scrollbar-thumb': {
                  background: 'grey',
                  borderRadius: '0.5rem',
                },
              },
              '&.MuiDataGrid-root': {
                minHeight: '13rem',
                maxHeight: '52rem',
              },
              '& .MuiDataGrid-overlayWrapper': {
                flex: 1,
              },
              '& .MuiDataGrid-cell': {
                '&:focus': {
                  outline: 'none',
                },
              },
              '& .MuiDataGrid-row': {
                cursor: 'pointer',
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
)
