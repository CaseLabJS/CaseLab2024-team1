import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { theme } from '@/theme/theme.ts'
import { Decorator } from '@storybook/react'
import { FormProvider, useForm } from 'react-hook-form'

export const decorators: Decorator[] = [
  (Story) => {
    const methods = useForm({
      defaultValues: {
        items: [{ documentType: '', requestSignature: false, attributes: [] }],
      },
    })

    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <FormProvider {...methods}>
          <Story />
        </FormProvider>
      </ThemeProvider>
    )
  },
]
