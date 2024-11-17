import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { User, Role, Roles } from '@/types/sharedTypes'
import { usersListStore } from '@/stores/UsersListStore'
import UserStore from '@/stores/UserStore'
import { observer } from 'mobx-react-lite'
import {
  Box,
  Button,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material'
import { SerializedError } from '@/api/core/serializedError'
interface EditUserProps {
  user: User
  role: Role
  onClose: () => void
  setSnackbarIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  setSnackbarText: React.Dispatch<React.SetStateAction<string | null>>
  setSnackbarError: React.Dispatch<React.SetStateAction<SerializedError | null>>
}

const EditUser: React.FC<EditUserProps> = observer(
  ({
    user,
    role,
    onClose,
    setSnackbarIsOpen,
    setSnackbarText,
    setSnackbarError,
  }) => {
    const {
      register,
      setValue,
      formState: { errors, isValid },
      handleSubmit,
    } = useForm({
      defaultValues: {
        ...user,
        roleName: user?.roles[0]?.name,
      } as User & { roleName: string },
      mode: 'onChange',
    })
    const userStore = new UserStore(user)
    const onSubmit: SubmitHandler<User & { roleName: string }> = async (
      data
    ) => {
      let isChanged = false
      let patchError = null
      if (
        data.name !== user?.name ||
        data.surname !== user.surname ||
        data.email !== user.email
      ) {
        isChanged = true
        patchError = await userStore.patchUser({
          name: data.name,
          surname: data.surname,
          email: data.email,
        })
      }
      if ((data.roleName as Roles) !== role.name) {
        isChanged = true
        await userStore.removeUserRole(role)
        await userStore.addUserRole({
          id: data.roleName === 'ADMIN' ? 1 : 2,
          name: data.roleName === 'ADMIN' ? Roles.ADMIN : Roles.USER,
        })
      }
      if (isChanged && patchError == null) {
        await usersListStore.fetchUsers()
        setSnackbarText('Пользователь изменен')
        setSnackbarError(null)
        setSnackbarIsOpen(true)
      } else {
        setSnackbarText(
          patchError?.message !== undefined ? patchError.message : null
        )
        setSnackbarError(patchError)
      }
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
              error={!!errors.name}
              helperText={errors.name?.message}
            />
            <TextField
              sx={{ marginBottom: 2 }}
              label="Фамилия"
              variant="outlined"
              fullWidth
              {...register('surname', { required: 'Surname required' })}
              error={!!errors.surname}
              helperText={errors.surname?.message}
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
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <FormControl sx={{ marginBottom: 2 }} fullWidth>
              <InputLabel id="role-select-label">Роль</InputLabel>
              <Select
                sx={{ textAlign: 'start' }}
                labelId="role-select-label"
                label="Роль"
                defaultValue={user?.roles[0]?.name}
                {...register('roleName')}
                onChange={(event) => setValue('roleName', event.target.value)}
              >
                <MenuItem value={Roles.ADMIN}>ADMIN</MenuItem>
                <MenuItem value={Roles.USER}>USER</MenuItem>
              </Select>
            </FormControl>
            <Button variant="contained" type="submit" disabled={!isValid}>
              Сохранить
            </Button>
          </Box>
        </Box>
      </Box>
    )
  }
)

export default EditUser
