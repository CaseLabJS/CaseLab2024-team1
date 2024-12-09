import Box from '@mui/material/Box'
import { Button, Paper, Typography } from '@mui/material'
import { ROUTES } from '@/router/constants.ts'
import AttributeTable from '@/pages/AttributesPage/components/AttributeTable'
import { useNavigate } from 'react-router-dom'
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
  getAliveCell: () => (
    params: GridRenderCellParams<AttributesWithDocumentTypes>
  ) => JSX.Element
  aliveRows: AttributesWithDocumentTypes[]
  paginationModel: { page: number; pageSize: number }
  setPaginationModel: Dispatch<
    SetStateAction<{ page: number; pageSize: number }>
  >
  totalAliveCount: number
  aliveTable: boolean
}

const AliveAttributesTable = (props: Props) => {
  const {
    getDocumentTypesNamesCell,
    getAliveCell,
    aliveRows,
    paginationModel,
    setPaginationModel,
    totalAliveCount,
    aliveTable,
  } = props
  const navigate = useNavigate()
  return (
    <Paper>
      <Box sx={{ p: 3 }}>
        <Box textAlign="left" mb={1}>
          <Typography variant="h5">Атрибуты</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Button
            variant="outlined"
            onClick={() => navigate(ROUTES.admin('attribute-type/create'))}
          >
            Создать атрибут
          </Button>
        </Box>
        <AttributeTable
          key={0}
          documentTypesNamesCell={getDocumentTypesNamesCell()}
          actionCell={getAliveCell()}
          rows={aliveRows}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          rowCount={totalAliveCount}
          aliveTable={aliveTable}
        />
      </Box>
    </Paper>
  )
}

export default AliveAttributesTable
