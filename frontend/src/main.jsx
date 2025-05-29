import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#aa52ed', // red button bg
      contrastText: '#fff',
    },
    secondary: {
      main: '#3A66B0', // navbar bg
      contrastText: '#FFC242',
    },
  },
  typography: {
    fontFamily: "'Press Start 2P', cursive",
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
);
