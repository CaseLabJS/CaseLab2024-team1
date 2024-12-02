import { Slider, Typography } from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form'
import { VoteFormValues } from './types'

export const PercentageSlider = () => {
  const { control, watch } = useFormContext<VoteFormValues>()
  const percentage = watch('approvalThreshold')

  return (
    <>
      <Typography gutterBottom>
        Необходимый процент голосов: {percentage}%{' '}
      </Typography>
      <Controller
        name={'approvalThreshold'}
        control={control}
        defaultValue={50} // Значение по умолчанию
        render={({ field }) => (
          <Slider
            {...field}
            value={field.value ?? 50}
            onChange={(_, value) => field.onChange(value)}
            aria-labelledby="approvalThreshold-slider"
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => `${value}%`}
            min={0}
            max={100}
          />
        )}
      />
    </>
  )
}
