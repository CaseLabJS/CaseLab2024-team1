import { Grid2 } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import {
  AttributesWithDocumentTypes,
  FunctionActionCell,
  FunctionDocumentTypesNamesCell,
} from '@/pages/AttributesPage/attributesPageTypes.ts'
import { Dispatch, SetStateAction } from 'react'

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
}
const AttributeTable = (props: Props) => {
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', minWidth: 150 },
    { field: 'name', headerName: 'Name', minWidth: 250 },
    { field: 'required', headerName: 'Required', minWidth: 150 },
    {
      field: 'documentTypes',
      headerName: 'DocumentTypesName',
      renderCell: props.documentTypesNamesCell,
      minWidth: 300,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      renderCell: props.actionCell,
      minWidth: 150,
    },
  ]
  return (
    <Grid2>
      <DataGrid
        columns={columns}
        rows={props.rows}
        disableRowSelectionOnClick
        getRowHeight={() => 'auto'}
        paginationMode="server"
        paginationModel={props.paginationModel}
        onPaginationModelChange={props.onPaginationModelChange}
        pageSizeOptions={[10, 20, 40]}
        rowCount={props.rowCount}
      />
    </Grid2>
  )
}

export default AttributeTable
