import { createTheme } from '@mui/material/styles'

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#de5d6a',
      contrastText: '#fff',
    },
    secondary: {
      main: '#909bd2',
    },
    background: {
      paper: '#050918',
      default: '#121212',
    },
  },
})

export const Pallete = {
  dark: darkTheme,
}
