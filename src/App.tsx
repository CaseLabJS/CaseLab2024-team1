import './App.css'
import { ThemeProvider } from './theme/theme-provider/theme-provider'
import CssBaseline from '@mui/material/CssBaseline'
import { CreateDocumentForm } from './components/createDocumentForm/createDocumentForm.tsx'

function App() {
  return (
    <ThemeProvider>
      <CssBaseline />
      <section className="main">
        <CreateDocumentForm />
      </section>
    </ThemeProvider>
  )
}

export default App
