import { Grid2 } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { useEffect, useState } from 'react'
import attributeListStore from '@/stores/AttributeListStore'
import { Attribute } from '@/types/sharedTypes.ts'

const AttributeTable = () => {
  const [rows, setRows] = useState<Attribute[]>([])
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID' },
    { field: 'name', headerName: 'Name' },
    { field: 'required', headerName: 'Required' },
  ]
  useEffect(() => {
    void attributeListStore.fetchAttributes().then(() => {
      setRows(getAttributesRows())
    })
  }, [])
  const getAttributesRows = () => {
    const array: Attribute[] = []
    attributeListStore.attributes.forEach((attribute) => {
      array.push({
        id: attribute.data.id,
        name: attribute.data.name,
        required: attribute.data.required,
      })
    })
    return array
  }
  return (
    <Grid2>
      <DataGrid
        columns={columns}
        rows={rows}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Grid2>
  )
}

export default AttributeTable
