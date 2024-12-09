import Box from '@mui/material/Box'
import { Paper, Typography } from '@mui/material'
import AttributeTable from '@/pages/AttributesPage/components/AttributeTable'
import { GridRenderCellParams } from '@mui/x-data-grid'
import {
  AttributesWithDocumentTypes,
  DocumentTypeWithoutAttributesArray,
} from '@/pages/AttributesPage/attributesPageTypes.ts'
import { Dispatch, SetStateAction } from 'react'

interface Props {
  getDocumentTypesNamesCell: () => (
    params: GridRenderCellParams<DocumentTypeWithoutAttributesArray[]>
  ) => JSX.Element
  getDeadCell: () => (
    params: GridRenderCellParams<AttributesWithDocumentTypes>
  ) => JSX.Element
  deadRows: AttributesWithDocumentTypes[]
  paginationModel: { page: number; pageSize: number }
  setPaginationModel: Dispatch<
    SetStateAction<{ page: number; pageSize: number }>
  >
  totalDeadCount: number
  aliveTable: boolean
}

const DeadAttributesTable = (props: Props) => {
  const {
    getDocumentTypesNamesCell,
    getDeadCell,
    deadRows,
    paginationModel,
    setPaginationModel,
    totalDeadCount,
    aliveTable,
  } = props
  return (
    <Paper>
      <Box sx={{ p: 3 }}>
        <Box textAlign="left" mb={1}>
          <Typography variant="h5">Удаленные атрибуты</Typography>
        </Box>
        <AttributeTable
          key={1}
          documentTypesNamesCell={getDocumentTypesNamesCell()}
          actionCell={getDeadCell()}
          rows={deadRows}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          rowCount={totalDeadCount}
          aliveTable={aliveTable}
        />
      </Box>
    </Paper>
  )
}

export default DeadAttributesTable
