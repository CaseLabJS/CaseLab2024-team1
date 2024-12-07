import { useState, ChangeEvent } from 'react'
import { Box, Typography, InputLabel, InputBase } from '@mui/material'
import { useFormContext } from 'react-hook-form'

export const FileInput = () => {
  const { register } = useFormContext()

  const [file, setFile] = useState<File | null>(null)

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files
    setFile(fileList ? fileList[0] : null)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Typography
          variant="body1"
          sx={{
            color: 'primary.main',
            fontWeight: 600,
          }}
        >
          {file ? file.name : 'Файл не загружен'}
        </Typography>
        <>
          <InputLabel
            htmlFor={'file-input'}
            sx={{ color: 'primary.main', cursor: 'pointer' }}
          >
            {!file ? '(загрузить)' : '(изменить)'}
          </InputLabel>
          <InputBase
            id="file-input"
            {...register('file', { required: 'File is required' })}
            type="file"
            sx={{ display: 'none' }}
            inputProps={{
              accept: '.pdf,.png,.jpg,.jpeg,.txt,.docx',
              multiple: false,
            }}
            onChange={handleFileChange}
          />
        </>
      </Box>
    </Box>
  )
}
