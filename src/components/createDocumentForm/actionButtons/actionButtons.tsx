import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

import { Controller, useFormContext } from 'react-hook-form'
import { SelectField } from '@/components/selectField/selectField.tsx'
import { agreement } from '@/stories/selectField/testData/testData.ts'

export const ActionButtons = () => {
  const { control } = useFormContext()

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        justifyContent: { xs: 'center', lg: 'left' },
        gap: {
          xs: '0.5rem',
          md: '1.5rem',
        },
      }}
    >
      <Box sx={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        <Box>
          <Button color="primary" variant="contained" fullWidth type="submit">
            Подписать и отправить
          </Button>
        </Box>
        <Box>
          <Controller
            name="status"
            control={control}
            render={({ field }) => {
              return (
                <SelectField
                  options={agreement}
                  fullWidth
                  label="Статус"
                  getOptionLabel={(option) => option.text}
                  {...field}
                />
              )
            }}
          />
        </Box>
      </Box>

      <Box sx={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        <Box>
          <Button color="primary" fullWidth variant="text">
            Сохранить в черновиках
          </Button>
        </Box>
        <Box>
          <Button color="primary" fullWidth variant="text">
            Отменить
          </Button>
        </Box>
      </Box>
    </Box>
  )
}
