import Grid2 from '@mui/material/Grid2'
import TextField from '@mui/material/TextField'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import Error from '@/pages/CreateAttributePage/_components/error'
import Success from '@/pages/CreateAttributePage/_components/success'
import { NewAttribute } from '@/types/sharedTypes.ts'
import React, { ChangeEvent } from 'react'
import { Button } from '@mui/material'
import { observer } from 'mobx-react-lite'

interface Props {
  attribute: NewAttribute
  countAttributeTypes: number
  error: string | null
  success: string | null
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  getHtmlDocumentTypesIds: (count: number) => JSX.Element[]
  addDocumentTypesNames: (e: React.MouseEvent<HTMLButtonElement>) => void
}
const CreateAttributeForm = observer((props: Props) => {
  return (
    <Grid2>
      <h1 style={{ textAlign: 'center' }}>Создание атрибута</h1>
      <form onSubmit={props.handleSubmit}>
        <Grid2
          container
          spacing={2}
          direction="column"
          alignItems="center"
          padding="15px"
          justifyContent="center"
        >
          <Grid2>
            <TextField
              name="name"
              label="Название аттрибута"
              variant="outlined"
              value={props.attribute.name}
              onChange={props.handleChange}
              required
            />
          </Grid2>
          {props
            .getHtmlDocumentTypesIds(props.countAttributeTypes)
            .map((element) => element)}
          <Grid2>
            <Button variant={'outlined'} onClick={props.addDocumentTypesNames}>
              <AddCircleOutlineIcon />
            </Button>
          </Grid2>
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
          <Grid2>
            <Button variant={'contained'} type="submit">
              Создать атрибут
            </Button>
          </Grid2>
        </Grid2>
      </form>
      {props.error && <Error error={props.error} />}
      {props.success && <Success success={props.success} />}
    </Grid2>
  )
})

export default CreateAttributeForm
