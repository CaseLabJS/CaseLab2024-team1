import React, { useState } from 'react'
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  ThemeProvider,
  createTheme,
  IconButton,
} from '@mui/material'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'

const AdminPage = () => {
  // State variables for form fields
  const [userId, setUserId] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('User')

  // State variable for dark mode
  const [darkMode, setDarkMode] = useState(true)

  // Create a theme based on the darkMode state
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  })

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newUser = {
      id: userId,
      firstName,
      lastName,
      email,
      password,
      role,
    }
    console.log('New User Created:', newUser)
    // Here you can add logic to send the data to the server
  }

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          padding: 2,
          backgroundColor: darkMode ? '#121212' : '#ffffff',
          color: darkMode ? '#ffffff' : '#000000',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            width: '100%',
            marginBottom: 2,
          }}
        >
          <IconButton onClick={toggleDarkMode}>
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            maxWidth: '400px',
            backgroundColor: darkMode ? '#1e1e1e' : '#f5f5f5',
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
                onChange={(e) => setUserId(e.target.value)}
                InputProps={{
                  style: { color: darkMode ? '#ffffff' : '#000000' },
                }}
                InputLabelProps={{
                  style: { color: darkMode ? '#ffffff' : '#000000' },
                }}
              />
            </Box>
            <Box sx={{ marginBottom: 2 }}>
              <TextField
                label="Имя"
                variant="outlined"
                fullWidth
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                InputProps={{
                  style: { color: darkMode ? '#ffffff' : '#000000' },
                }}
                InputLabelProps={{
                  style: { color: darkMode ? '#ffffff' : '#000000' },
                }}
              />
            </Box>
            <Box sx={{ marginBottom: 2 }}>
              <TextField
                label="Фамилия"
                variant="outlined"
                fullWidth
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                InputProps={{
                  style: { color: darkMode ? '#ffffff' : '#000000' },
                }}
                InputLabelProps={{
                  style: { color: darkMode ? '#ffffff' : '#000000' },
                }}
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
                InputProps={{
                  style: { color: darkMode ? '#ffffff' : '#000000' },
                }}
                InputLabelProps={{
                  style: { color: darkMode ? '#ffffff' : '#000000' },
                }}
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
                InputProps={{
                  style: { color: darkMode ? '#ffffff' : '#000000' },
                }}
                InputLabelProps={{
                  style: { color: darkMode ? '#ffffff' : '#000000' },
                }}
              />
            </Box>
            <Box sx={{ marginBottom: 2 }}>
              <FormControl fullWidth>
                <InputLabel
                  id="role-label"
                  style={{ color: darkMode ? '#ffffff' : '#000000' }}
                >
                  Роль
                </InputLabel>
                <Select
                  labelId="role-label"
                  id="role-select"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  label="Роль"
                  fullWidth
                  inputProps={{
                    style: { color: darkMode ? '#ffffff' : '#000000' },
                  }}
                >
                  <MenuItem value="User">Пользователь</MenuItem>
                  <MenuItem value="Admin">Администратор</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box
              sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}
            >
              <Button variant="contained" color="primary" type="submit">
                Создать пользователя
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default AdminPage
