import React, { useState } from 'react'
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  ThemeProvider,
  createTheme,
} from '@mui/material'
import { observer } from 'mobx-react-lite'

const DocumentTypeCreationPage: React.FC = observer(() => {
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [documentType, setDocumentType] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [titleError, setTitleError] = useState<string>('')
  const [documentTypeError, setDocumentTypeError] = useState<string>('')

  const theme = createTheme({
    palette: {
      mode: 'dark',
    },
  })

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    validateForm()
  }

  const validateForm = () => {
    let isValid = true

    if (!title) {
      setTitleError('Поле "Название документа" обязательно для заполнения')
      isValid = false
    } else {
      setTitleError('')
    }

    if (!documentType) {
      setDocumentTypeError('Поле "Тип документа" обязательно для заполнения')
      isValid = false
    } else {
      setDocumentTypeError('')
    }

    if (isValid) {
      submitForm().catch((error) => {
        console.error('Error submitting form:', error)
      })
    }
  }

  const submitForm = async () => {
    setLoading(true)

    try {
      console.log({ title, description, documentType })

      await new Promise((resolve) => setTimeout(resolve, 2000))

      setTitle('')
      setDescription('')
      setDocumentType('')
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Создание типа документа
        </Typography>
        <form
          onSubmit={handleSubmit}
          style={{ width: '100%', maxWidth: '400px' }}
        >
          <TextField
            fullWidth
            label="Название документа"
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            error={!!titleError}
            helperText={titleError}
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth error={!!documentTypeError} sx={{ mb: 2 }}>
            <InputLabel>Тип документа</InputLabel>
            <Select
              value={documentType}
              onChange={(e) => setDocumentType(e.target.value)}
              label="Тип документа"
            >
              <MenuItem value="report">Отчет</MenuItem>
              <MenuItem value="invoice">Счет</MenuItem>
              <MenuItem value="contract">Контракт</MenuItem>
            </Select>
            <FormHelperText>{documentTypeError}</FormHelperText>
          </FormControl>
          <TextField
            fullWidth
            label="Описание"
            variant="outlined"
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
            fullWidth
          >
            {loading ? <CircularProgress size={24} /> : 'Создать'}
          </Button>
        </form>
      </Box>
    </ThemeProvider>
  )
})

export default DocumentTypeCreationPage
