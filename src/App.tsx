import './App.css'

import { RouterProvider } from 'react-router-dom'
import { ThemeProvider } from './theme/theme-provider/theme-provider'
import CssBaseline from '@mui/material/CssBaseline'

import router from '@/router'

function App() {
  return (
    <ThemeProvider>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App
