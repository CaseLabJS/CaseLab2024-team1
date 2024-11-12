import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles'
import { PropsWithChildren } from 'react'
import { theme } from '@/theme/theme.ts'
import { observer } from 'mobx-react-lite'

export const ThemeProvider = observer(({ children }: PropsWithChildren) => {
  return <MUIThemeProvider theme={theme}>{children}</MUIThemeProvider>
})
