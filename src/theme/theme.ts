import { createTheme } from '@mui/material/styles'

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    // primary: {
    //   main: '#909bd2',
    //   contrastText: '#fff',
    // },
    // secondary: {
    //   main: '#5d9ede',
    // },
    background: {
      paper: '#050c27',
      default: '#121212',
    },
  },
})

export const Pallete = {
  dark: darkTheme,
}
