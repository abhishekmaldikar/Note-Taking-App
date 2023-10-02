import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { CssBaseline, ThemeProvider , createTheme} from '@mui/material';
import { NotesContextProvider } from '../src/context/NoteContext.jsx';

const theme = createTheme({
  palette: {
    primary: {
      main: '#fff0e5',
    },
    secondary: {
      main: '#ffcc99',
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CssBaseline/>
    <NotesContextProvider>
    <ThemeProvider theme={theme}>
      <App/>
    </ThemeProvider>
    </NotesContextProvider>
  </React.StrictMode>,
)
