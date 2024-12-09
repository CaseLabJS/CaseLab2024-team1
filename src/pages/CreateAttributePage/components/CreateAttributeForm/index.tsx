import TextField from '@mui/material/TextField'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { NewAttribute } from '@/types/sharedTypes.ts'
import React, { ChangeEvent } from 'react'
import { Alert, Button, Snackbar, Typography } from '@mui/material'
import { observer } from 'mobx-react-lite'
import Box from '@mui/material/Box'

interface Props {
  attribute: NewAttribute
  countAttributeTypes: number
  error: string | null
  success: string | null
  snackbarIsOpen: boolean
  setSnackbarIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  getHtmlDocumentTypesIds: (count: number) => JSX.Element[]
  addDocumentTypesNames: (e: React.MouseEvent<HTMLButtonElement>) => void
}
const CreateAttributeForm = observer((props: Props) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 2,
        borderRadius: 2,
        textAlign: 'center',
      }}
    >
      <Typography component="h1" variant="h5" gutterBottom textAlign={'center'}>
        Создание атрибута
      </Typography>
      <Box component={'form'} onSubmit={props.handleSubmit}>
        <Box>
          <TextField
            name="name"
            label="Название аттрибута"
            variant="outlined"
            value={props.attribute.name}
            onChange={props.handleChange}
            required
            fullWidth={true}
          />
        </Box>
        {props.getHtmlDocumentTypesIds(props.countAttributeTypes)}
        <Box sx={{ paddingTop: 2 }}>
          <Button variant={'outlined'} onClick={props.addDocumentTypesNames}>
            <AddCircleOutlineIcon />
          </Button>
        </Box>
        <Box sx={{ paddingTop: 2 }}>
          <label htmlFor="required">Обязательный</label>
          <input
            type="checkbox"
            id="required"
            name="required"
            checked={props.attribute.required}
            onChange={props.handleChange}
          />
        </Box>
        <Box sx={{ paddingTop: 2 }}>
          <Button variant={'contained'} type="submit">
            Создать атрибут
          </Button>
        </Box>
      </Box>
      <Snackbar
        open={props.snackbarIsOpen}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        onClose={() => props.setSnackbarIsOpen(false)}
      >
        <Alert
          severity={props.error ? 'error' : 'success'}
          sx={{ width: '100%' }}
        >
          {props.error ? props.error : props.success}
        </Alert>
      </Snackbar>
    </Box>
  )
})

export default CreateAttributeForm
