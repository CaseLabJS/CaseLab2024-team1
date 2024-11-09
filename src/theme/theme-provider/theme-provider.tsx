import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles'
import { PropsWithChildren } from 'react'
import { theme } from '@/theme/theme.ts'

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  return <MUIThemeProvider theme={theme}>{children}</MUIThemeProvider>
}
