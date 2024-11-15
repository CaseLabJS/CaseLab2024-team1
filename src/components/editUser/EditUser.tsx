import React, { useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { User, Role, Roles } from '@/types/sharedTypes'
import { usersListStore } from '@/stores/UsersListStore'
import UserStore from '@/stores/UserStore'
import { observer } from 'mobx-react-lite'
import { Box, Button, TextField, Typography } from '@mui/material'
interface EditUserProps {
  user: User
  role: Role
  onClose: () => void
}

const EditUser: React.FC<EditUserProps> = observer(
  ({ user, role, onClose }) => {
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
    useEffect(() => {
      if (user?.roles?.[0]?.name) {
        setValue('roleName', user.roles[0].name)
      }
    }, [user, setValue])
    const onSubmit: SubmitHandler<User & { roleName: string }> = async (
      data
    ) => {
      const userStore = new UserStore(user)
      let isChanged = false
      if (
        data.name !== user?.name ||
        data.surname !== user.surname ||
        data.email !== user.email
      ) {
        isChanged = true
        await userStore.patchUser({
          name: data.name,
          surname: data.surname,
          email: data.email,
        })
      }
      if ((data.roleName as Roles) !== role.name) {
        isChanged = true
        await userStore.removeUserRole(role)
        await userStore.addUserRole({
          id: (data.roleName as Roles) === Roles.ADMIN ? 1 : 2,
          name: data.roleName === 'ADMIN' ? Roles.ADMIN : Roles.USER,
        })
      }
      if (isChanged) {
        void usersListStore.fetchUsers()
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
            <TextField
              sx={{ marginBottom: 2 }}
              label="Роль"
              variant="outlined"
              fullWidth
              {...register('roleName', {
                required: 'Role required',
                pattern: {
                  value: /^(ADMIN|USER)$/,
                  message: 'Invalid role format',
                },
              })}
              error={!!errors.roleName}
              helperText={errors.roleName?.message}
            />
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
