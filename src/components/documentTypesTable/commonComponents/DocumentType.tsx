import TypeAttributes from './TypeAttributes'
import { DocumentTypeProps } from '../types'
import documentTypeListStore from '@/stores/DocumentTypeListStore'
import { Box, IconButton, TableCell, TableRow } from '@mui/material'
import { Delete, Edit, Replay } from '@mui/icons-material'

const DocumentType = (props: DocumentTypeProps) => {
  const type = props.type
  const deleteType = async (typeId: number) => {
    await documentTypeListStore.deleteDocumentType(typeId)
    props.setSnackBarOpen(true)
  }
  const recoverType = async (typeId: number) => {
    await documentTypeListStore.recoverDocumentType(typeId)
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
          {props.showOnlyAlive && (
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <IconButton onClick={() => void deleteType(type.id)}>
                <Delete
                  sx={{
                    width: { xs: '20px', md: '24px', lg: '24px' },
                    height: { xs: '20px', md: '24px', lg: '24px' },
                  }}
                />
              </IconButton>
              <IconButton>
                <Edit
                  sx={{
                    width: { xs: '20px', md: '24px', lg: '24px' },
                    height: { xs: '20px', md: '24px', lg: '24px' },
                  }}
                />
              </IconButton>
            </Box>
          )}
          {!props.showOnlyAlive && (
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <IconButton
                onClick={() => void recoverType(type.id)}
                sx={{ mr: { xs: '0px', md: '5px', lg: '5px' }, p: 0 }}
              >
                <Replay
                  sx={{
                    width: { xs: '20px', md: '24px', lg: '24px' },
                    height: { xs: '20px', md: '24px', lg: '24px' },
                  }}
                />
              </IconButton>
            </Box>
          )}
        </TableCell>
      </TableRow>
    </>
  )
}

export default DocumentType
