import { DocumentType as DocTypeInterface } from '@/types/sharedTypes'
import { IconButton, TableCell, TableRow } from '@mui/material'
import { Delete, Edit } from '@mui/icons-material'
import TypeAttributes from './TypeAttributes'

interface DocumentTypeProps {
  type: DocTypeInterface
}

const DocumentType = (props: DocumentTypeProps) => {
  const type = props.type
  return (
    <TableRow>
      <TableCell>{type.id}</TableCell>
      <TableCell>{type.name}</TableCell>
      <TableCell>
        <TypeAttributes attributes={type.attributes} />
      </TableCell>
      <TableCell>
        <IconButton sx={{ mr: '5px' }}>
          <Delete />
        </IconButton>
        <IconButton>
          <Edit />
        </IconButton>
      </TableCell>
    </TableRow>
  )
}

export default DocumentType
