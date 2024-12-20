import DeleteIcon from '@mui/icons-material/Delete'
import React from 'react'
import { DocumentType, NewAttribute } from '@/types/sharedTypes.ts'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import { Button, SelectChangeEvent } from '@mui/material'
import FormControl from '@mui/material/FormControl'
import { observer } from 'mobx-react-lite'
import Box from '@mui/material/Box'

interface Props {
  i: number
  attribute: NewAttribute
  documentTypesIds: DocumentType[]
  handleChangeSelect: (e: SelectChangeEvent<number>) => void
  deleteDocumentTypesNames: (
    index: number
  ) => (e: React.MouseEvent<HTMLButtonElement>) => void
}

const DocumentTypeId = observer((props: Props) => {
  return (
    <Box key={props.i} sx={{ paddingTop: 2 }}>
      <FormControl>
        <InputLabel id={`documentTypesIds${props.i}`}>
          {`Тип документа ${props.i + 1})`}
        </InputLabel>
        <Select
          labelId={`documentTypesIds${props.i}`}
          label={`documentTypesIds${props.i}`}
          name={`documentTypesIds${props.i}`}
          value={props.attribute.documentTypesIds[props.i] || ''}
          autoWidth
          sx={
            props.i === 0
              ? { minWidth: 379, textAlign: 'left' }
              : { minWidth: 300, textAlign: 'left' }
          }
          onChange={props.handleChangeSelect}
        >
          {props.documentTypesIds.map((type) => {
            return (
              <MenuItem value={type.id} key={type.id}>
                {type.name}
              </MenuItem>
            )
          })}
        </Select>
      </FormControl>
      {props.i !== 0 && (
        <Button
          variant={'outlined'}
          onClick={props.deleteDocumentTypesNames(props.i)}
          sx={{ minHeight: '56px', marginLeft: '15px' }}
        >
          <DeleteIcon />
        </Button>
      )}
    </Box>
  )
})

export default DocumentTypeId
