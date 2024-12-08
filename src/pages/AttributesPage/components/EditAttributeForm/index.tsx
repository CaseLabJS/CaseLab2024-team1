import TextField from '@mui/material/TextField'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { Button, Grid2 } from '@mui/material'
import { NewAttribute } from '@/types/sharedTypes.ts'
import React, { ChangeEvent } from 'react'

interface Props {
  documentTypes: JSX.Element[]
  attribute: NewAttribute
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  addDocumentTypesNames: (e: React.MouseEvent<HTMLButtonElement>) => void
}
const EditAttributeForm = (props: Props) => {
  return (
    <>
      <h2 style={{ textAlign: 'center' }}>Изменить аттрибут</h2>
      <form onSubmit={props.handleSubmit}>
        <Grid2
          container
          spacing={2}
          direction="column"
          alignItems="center"
          padding="15px"
          justifyContent="center"
        >
          <TextField
            name="name"
            label="Название аттрибута"
            variant="outlined"
            value={props.attribute.name}
            onChange={props.handleChange}
            required
          />
          {props.documentTypes}
          <Button variant={'outlined'} onClick={props.addDocumentTypesNames}>
            <AddCircleOutlineIcon />
          </Button>
          <Grid2>
            <label htmlFor="required">Обязательный</label>
            <input
              type="checkbox"
              id="required"
              name="required"
              checked={props.attribute.required}
              onChange={props.handleChange}
            />
          </Grid2>
          <Button variant={'contained'} type="submit">
            Изменить атрибут
          </Button>
        </Grid2>
      </form>
    </>
  )
}

export default EditAttributeForm
