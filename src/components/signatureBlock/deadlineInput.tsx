import { Typography, TextField } from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form'
import { VoteFormValues } from './types'

export const DeadlineInput = () => {
  const { control } = useFormContext<VoteFormValues>()

  return (
    <>
      <Typography gutterBottom>Голосование активно до:</Typography>
      <Controller
        name="deadline"
        control={control}
        rules={{
          required: 'Выберите дату',
          validate: (value: string) => {
            const selectedDate = new Date(value).setHours(0, 0, 0, 0)
            const currentDate = new Date().setHours(0, 0, 0, 0)
            return (
              selectedDate > currentDate || 'Дата должна быть больше текущей'
            )
          },
        }}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            id="deadline"
            type="date"
            variant="standard"
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
          />
        )}
      />
    </>
  )
}
