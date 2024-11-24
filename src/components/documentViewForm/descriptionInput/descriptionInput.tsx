import { TextareaAutosize } from '@/components/styled/textareaAutosize.tsx'
import { Box } from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form'
export const DescriptionInput = () => {
  const { control } = useFormContext()

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <TextareaAutosize
            aria-label="description"
            placeholder="Введите здесь своё описание..."
            maxLength={255}
            minRows={3}
            {...field}
          />
        )}
      />
    </Box>
  )
}
