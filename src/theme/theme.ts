import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'class',
  },
  //to customize palette colors you can use next structure instead of boolean:
  colorSchemes: {
    light: {
      palette: {
        background: {
          default: '#F9F9FE',
        },
      },
    },
    dark: true,
  },
  // colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  defaultColorScheme: 'dark',
})
