import './App.css'

import { RouterProvider } from 'react-router-dom'
import { ThemeProvider } from './theme/theme-provider/theme-provider'
import CssBaseline from '@mui/material/CssBaseline'
import { CreateDocumentForm } from './components/createDocumentForm/createDocumentForm.tsx'

import router from '@/router'

function App() {
  return (
    <ThemeProvider>
      <CssBaseline />
      <RouterProvider router={router} />
      <section className="main">
        <CreateDocumentForm />
      </section>
    </ThemeProvider>
  )
}

export default App
