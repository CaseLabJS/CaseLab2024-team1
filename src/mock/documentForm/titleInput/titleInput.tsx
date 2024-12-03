import { Box, Typography, TextField } from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form'

export const TitleInput = () => {
  const { control } = useFormContext()

  return (
    <Box
      sx={{
        display: 'flex',
        gap: { xs: '0.2rem', sm: '1rem' },
        flexWrap: { xs: 'wrap', sm: 'nowrap' },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: '2.5rem',
          flexShrink: 0,
          minWidth: { xs: '2rem', sm: '4rem', md: '6rem' },
        }}
      >
        <Typography variant="body2">Название</Typography>
      </Box>

      <Controller
        name="title"
        control={control}
        rules={{
          required: 'Название документа обязательно',
          validate: (value: string) =>
            value.trim() !== '' ||
            'Название должно содержать хотя бы один символ',
        }}
        render={({ field, fieldState }) => {
          return (
            <TextField
              fullWidth
              size="small"
              {...field}
              error={!!fieldState.error?.message}
              helperText={fieldState.error?.message}
            />
          )
        }}
      />
    </Box>
  )
}
