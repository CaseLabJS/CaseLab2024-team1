import TextField from '@mui/material/TextField'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { Button, Typography } from '@mui/material'
import { NewAttribute } from '@/types/sharedTypes.ts'
import React, { ChangeEvent } from 'react'
import Box from '@mui/material/Box'

interface Props {
  documentTypes: JSX.Element[]
  attribute: NewAttribute
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  addDocumentTypesNames: (e: React.MouseEvent<HTMLButtonElement>) => void
}
const EditAttributeForm = (props: Props) => {
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
        Изменение атрибута
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
        {props.documentTypes}
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
            Изменить атрибут
          </Button>
        </Box>
      </Box>
    </Box>
    // <>
    //   <h2 style={{ textAlign: 'center' }}>Изменить аттрибут</h2>
    //   <form onSubmit={props.handleSubmit}>
    //     <Grid2
    //       container
    //       spacing={2}
    //       direction="column"
    //       alignItems="center"
    //       padding="15px"
    //       justifyContent="center"
    //     >
    //       <TextField
    //         name="name"
    //         label="Название аттрибута"
    //         variant="outlined"
    //         value={props.attribute.name}
    //         onChange={props.handleChange}
    //         required
    //       />
    //       {props.documentTypes}
    //       <Button variant={'outlined'} onClick={props.addDocumentTypesNames}>
    //         <AddCircleOutlineIcon />
    //       </Button>
    //       <Grid2>
    //         <label htmlFor="required">Обязательный</label>
    //         <input
    //           type="checkbox"
    //           id="required"
    //           name="required"
    //           checked={props.attribute.required}
    //           onChange={props.handleChange}
    //         />
    //       </Grid2>
    //       <Button variant={'contained'} type="submit">
    //         Изменить атрибут
    //       </Button>
    //     </Grid2>
    //   </form>
    // </>
  )
}

export default EditAttributeForm
