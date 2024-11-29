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
        return (
          <Controller
            key={value.attributeName}
            name={`values.${index}.attributeName`}
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label={values[index].attributeName}
                fullWidth
              />
            )}
          />
        )
      })}
    </Box>
  )
}
