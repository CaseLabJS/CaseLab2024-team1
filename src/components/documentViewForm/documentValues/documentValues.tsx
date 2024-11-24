import { Box, TextField } from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form'
import { FormValues } from '../types'
/*import { FC } from 'react'
import { DocumentValuesProps } from '../types'
import documentTypeListStore from '@/stores/DocumentTypeListStore'*/

export const DocumentValues = () => {
  const { control, watch } = useFormContext<FormValues>()
  const values = watch('values')

  return (
    <Box>
      {values.map((value, index) => {
        const name: `values.${number}.attributeName` = `values.${index}.attributeName`
        return (
          <Controller
            key={value.attributeName}
            name={name}
            control={control}
            render={({ field }) => (
              <TextField {...field} label={name} fullWidth />
            )}
          />
        )
      })}
    </Box>
  )
}
