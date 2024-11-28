import { DocumentType as DocTypeInterface } from '@/types/sharedTypes'
import { Box, IconButton, TableCell, TableRow } from '@mui/material'
import { Delete, Edit } from '@mui/icons-material'
import TypeAttributes from './TypeAttributes'
import documentTypeListStore from '@/stores/DocumentTypeListStore'

interface DocumentTypeProps {
  type: DocTypeInterface
  setSnackBarOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const DocumentType = (props: DocumentTypeProps) => {
  const type = props.type
  const deleteType = async (typeId: number) => {
    await documentTypeListStore.deleteDocumentType(typeId)
    props.setSnackBarOpen(true)
  }
  return (
    <>
      <TableRow
        sx={{
          '&:last-child td': {
            borderBottom: 0,
          },
        }}
      >
        <TableCell>{type.id}</TableCell>
        <TableCell>{type.name}</TableCell>
        <TableCell>
          <TypeAttributes attributes={type.attributes} />
        </TableCell>
        <TableCell>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <IconButton
              onClick={() => void deleteType(type.id)}
              sx={{ mr: '5px' }}
            >
              <Delete />
            </IconButton>
            <IconButton>
              <Edit />
            </IconButton>
          </Box>
        </TableCell>
      </TableRow>
    </>
  )
}

export default DocumentType
