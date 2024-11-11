import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { UserCredentials } from '@/types/sharedTypes'
import { observer } from 'mobx-react-lite'
import { Box, Button, TextField, Typography } from '@mui/material'
interface EditUserProps {
  user: UserCredentials | null
  onClose: () => void
}
const EditUser: React.FC<EditUserProps> = observer(({ user, onClose }) => {
  const { register, handleSubmit } = useForm<UserCredentials>({
    defaultValues: user || {},
  })
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 2,
        maxWidth: 400,
        margin: 'auto',
        minHeight: 400,
      }}
    >
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
        <Typography component="h1" variant="h5" gutterBottom>
          Отредактируйте данные пользователя
        </Typography>
        <Box component="form">
          <TextField
            sx={{ marginBottom: 2 }}
            label="Имя"
            variant="outlined"
            fullWidth
            {...register('name', { required: 'Name required' })}
          />
          <TextField
            sx={{ marginBottom: 2 }}
            label="Фамилия"
            variant="outlined"
            fullWidth
            {...register('surname', { required: 'Surname required' })}
          />
          <TextField
            sx={{ marginBottom: 2 }}
            label="Email"
            variant="outlined"
            fullWidth
            {...register('email', {
              required: 'Email required',
              pattern: {
                value: /^([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$)/,
                message: 'Invalid email format',
              },
            })}
          />
          <Button variant="contained" type="submit">
            Сохранить
          </Button>
        </Box>
      </Box>
    </Box>
  )
})

export default EditUser
