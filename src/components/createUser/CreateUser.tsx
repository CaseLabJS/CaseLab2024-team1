import React, { useState } from 'react'
import { UserCredentials } from '@/types/sharedTypes'
import { usersListStore } from '@/stores/UsersListStore'
import { observer } from 'mobx-react-lite'
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material'
const CreateUser: React.FC = observer(() => {
  const [userId, setUserId] = useState(0)
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('USER')
  const resetAll = () => {
    setUserId(0)
    setName('')
    setSurname('')
    setEmail('')
    setPassword('')
    setRole('USER')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newUser: UserCredentials = {
      // id: userId,
      name,
      surname,
      email,
      password,
      // role,
    }
    usersListStore
      .createUser(newUser)
      .then((res) => res)
      .catch((err) => {
        console.log(err)
      })
    resetAll()
  }
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        padding: 2,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          width: '100%',
          marginBottom: 2,
        }}
      ></Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          maxWidth: '400px',
          padding: 2,
          borderRadius: 2,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Создание пользователя
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <Box sx={{ marginBottom: 2 }}>
            <TextField
              label="ID"
              variant="outlined"
              fullWidth
              value={userId}
              type="number"
              onChange={(e) => setUserId(Number(e.target.value))}
            />
          </Box>
          <Box sx={{ marginBottom: 2 }}>
            <TextField
              label="Имя"
              variant="outlined"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Box>
          <Box sx={{ marginBottom: 2 }}>
            <TextField
              label="Фамилия"
              variant="outlined"
              fullWidth
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />
          </Box>
          <Box sx={{ marginBottom: 2 }}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Box>
          <Box sx={{ marginBottom: 2 }}>
            <TextField
              label="Пароль"
              variant="outlined"
              fullWidth
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Box>
          <Box sx={{ marginBottom: 2 }}>
            <FormControl fullWidth>
              <InputLabel id="role-label">Роль</InputLabel>
              <Select
                labelId="role-label"
                id="role-select"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                label="Роль"
                fullWidth
              >
                <MenuItem value="USER">Пользователь</MenuItem>
                <MenuItem value="ADMIN">Администратор</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
            <Button variant="contained" color="primary" type="submit">
              Создать пользователя
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  )
})

export default CreateUser
