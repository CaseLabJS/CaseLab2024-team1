import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles'
import { Pallete } from '../theme'
import { PropsWithChildren } from 'react'

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const theme = Pallete['dark']

  return <MUIThemeProvider theme={theme}>{children}</MUIThemeProvider>
}
