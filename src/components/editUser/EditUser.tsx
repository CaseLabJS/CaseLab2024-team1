import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { UserCredentials, User } from '@/types/sharedTypes'
import { usersListStore } from '@/stores/UsersListStore'
import UserStore from '@/stores/UserStore'
import { observer } from 'mobx-react-lite'
import { Box, Button, TextField, Typography } from '@mui/material'
interface EditUserProps {
  user: UserCredentials | null
  userRow: User | null
  onClose: () => void
}
const EditUser: React.FC<EditUserProps> = observer(
  ({ user, userRow, onClose }) => {
    const { register, handleSubmit } = useForm<UserCredentials>({
      defaultValues: user || {},
    })
    const onSubmit: SubmitHandler<UserCredentials> = async (data) => {
      const userStore = new UserStore(userRow)
      await userStore.patchUser(data)
      void usersListStore.fetchUsers()
      onClose()
    }
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
          <Box
            component="form"
            onSubmit={(event) => void handleSubmit(onSubmit)(event)}
          >
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
  }
)

export default EditUser
