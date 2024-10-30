import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ThemeProvider } from './theme/theme-provider/theme-provider'
import CssBaseline from '@mui/material/CssBaseline'

function App() {
  const [count, setCount] = useState(0)

  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App
