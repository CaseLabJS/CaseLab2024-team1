import { Grid2 } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import {
  AttributesWithDocumentTypes,
  FunctionActionCell,
  FunctionDocumentTypesNamesCell,
} from '@/pages/AttributesPage/attributesPageTypes.ts'

interface Props {
  documentTypesNamesCell: FunctionDocumentTypesNamesCell
  actionCell: FunctionActionCell
  rows: AttributesWithDocumentTypes[]
}
const AttributeTable = (props: Props) => {
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID' },
    { field: 'name', headerName: 'Name' },
    { field: 'required', headerName: 'Required' },
    {
      field: 'documentTypes',
      headerName: 'DocumentTypesName',
      renderCell: props.documentTypesNamesCell,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      renderCell: props.actionCell,
    },
  ]
  return (
    <Grid2>
      <DataGrid
        columns={columns}
        rows={props.rows}
        pageSizeOptions={[10]}
        disableRowSelectionOnClick
      />
    </Grid2>
  )
}

export default AttributeTable
