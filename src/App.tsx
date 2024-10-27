import './App.css';
import { ThemeProvider } from './theme/ThemeProvider/ThemeProvider';
import CssBaseline from '@mui/material/CssBaseline';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import { observer } from 'mobx-react-lite';

const App = observer(() => {
  return (
    <ThemeProvider>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
});

export default App;
