import { Grid2, styled } from '@mui/material'
import { DataGrid, GridColDef, GridPagination } from '@mui/x-data-grid'
import {
  AttributesWithDocumentTypes,
  FunctionActionCell,
  FunctionDocumentTypesNamesCell,
} from '@/pages/AttributesPage/attributesPageTypes.ts'
import { Dispatch, SetStateAction } from 'react'
import Box from '@mui/material/Box'

interface Props {
  documentTypesNamesCell: FunctionDocumentTypesNamesCell
  actionCell: FunctionActionCell
  rows: AttributesWithDocumentTypes[]
  paginationModel: {
    page: number
    pageSize: number
  }
  onPaginationModelChange: Dispatch<
    SetStateAction<{ page: number; pageSize: number }>
  >
  rowCount: number
  aliveTable: boolean
}
const AttributeTable = (props: Props) => {
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', minWidth: 150 },
    { field: 'name', headerName: 'Имя', minWidth: 250 },
    {
      field: 'required',
      headerName: 'Обязательный',
      minWidth: 150,
      valueGetter: (value: boolean) => {
        return value ? 'Да' : 'Нет'
      },
    },
    {
      field: 'documentTypes',
      headerName: 'Тип документа',
      renderCell: props.documentTypesNamesCell,
      minWidth: 300,
    },
    {
      field: 'actions',
      headerName: 'Действия',
      renderCell: props.actionCell,
      minWidth: 150,
    },
  ]
  const StyledGridOverlay = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    '& .no-rows-primary': {
      fill: '#3D4751',
      ...theme.applyStyles('light', {
        fill: '#AEB8C2',
      }),
    },
    '& .no-rows-secondary': {
      fill: '#1D2126',
      ...theme.applyStyles('light', {
        fill: '#E8EAED',
      }),
    },
  }))

  function CustomNoRowsOverlay() {
    return (
      <StyledGridOverlay>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          width={96}
          viewBox="0 0 452 257"
          aria-hidden
          focusable="false"
        >
          <path
            className="no-rows-primary"
            d="M348 69c-46.392 0-84 37.608-84 84s37.608 84 84 84 84-37.608 84-84-37.608-84-84-84Zm-104 84c0-57.438 46.562-104 104-104s104 46.562 104 104-46.562 104-104 104-104-46.562-104-104Z"
          />
          <path
            className="no-rows-primary"
            d="M308.929 113.929c3.905-3.905 10.237-3.905 14.142 0l63.64 63.64c3.905 3.905 3.905 10.236 0 14.142-3.906 3.905-10.237 3.905-14.142 0l-63.64-63.64c-3.905-3.905-3.905-10.237 0-14.142Z"
          />
          <path
            className="no-rows-primary"
            d="M308.929 191.711c-3.905-3.906-3.905-10.237 0-14.142l63.64-63.64c3.905-3.905 10.236-3.905 14.142 0 3.905 3.905 3.905 10.237 0 14.142l-63.64 63.64c-3.905 3.905-10.237 3.905-14.142 0Z"
          />
          <path
            className="no-rows-secondary"
            d="M0 10C0 4.477 4.477 0 10 0h380c5.523 0 10 4.477 10 10s-4.477 10-10 10H10C4.477 20 0 15.523 0 10ZM0 59c0-5.523 4.477-10 10-10h231c5.523 0 10 4.477 10 10s-4.477 10-10 10H10C4.477 69 0 64.523 0 59ZM0 106c0-5.523 4.477-10 10-10h203c5.523 0 10 4.477 10 10s-4.477 10-10 10H10c-5.523 0-10-4.477-10-10ZM0 153c0-5.523 4.477-10 10-10h195.5c5.523 0 10 4.477 10 10s-4.477 10-10 10H10c-5.523 0-10-4.477-10-10ZM0 200c0-5.523 4.477-10 10-10h203c5.523 0 10 4.477 10 10s-4.477 10-10 10H10c-5.523 0-10-4.477-10-10ZM0 247c0-5.523 4.477-10 10-10h231c5.523 0 10 4.477 10 10s-4.477 10-10 10H10c-5.523 0-10-4.477-10-10Z"
          />
        </svg>
        <Box sx={{ mt: 2 }}>
          {props.aliveTable ? 'Нет атрибутов' : 'Нет удаленных атрибутов'}
        </Box>
      </StyledGridOverlay>
    )
  }
  return (
    <Grid2>
      <DataGrid
        sx={props.rowCount === 0 ? { minHeight: 300 } : null}
        columns={columns}
        rows={props.rows}
        disableRowSelectionOnClick
        getRowHeight={() => 'auto'}
        paginationMode="server"
        paginationModel={props.paginationModel}
        onPaginationModelChange={props.onPaginationModelChange}
        pageSizeOptions={[10, 20, 40]}
        rowCount={props.rowCount}
        slots={{
          pagination: () => (
            <GridPagination labelRowsPerPage={'Аттрибутов на странице'} />
          ),
          noRowsOverlay: CustomNoRowsOverlay,
        }}
      />
    </Grid2>
  )
}

export default AttributeTable
