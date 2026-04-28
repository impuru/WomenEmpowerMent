import { createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
    text: {
      primary: '#f5f5f5',
      secondary: '#cfcfcf',
    },
  },
  typography: {
    fontFamily: '"Montserrat", sans-serif',
    fontWeightLight: 300,
    body1: {
      fontFamily: '"Montserrat", sans-serif',
      fontWeight: 300,
    },
    body2: {
      fontFamily: '"Montserrat", sans-serif',
      fontWeight: 300,
    },
    h1: {
      fontFamily: '"Montserrat", sans-serif',
      fontWeight: 300,
    },
    h2: {
      fontFamily: '"Montserrat", sans-serif',
      fontWeight: 300,
    },
    h3: {
      fontFamily: '"Montserrat", sans-serif',
      fontWeight: 300,
    },
    h4: {
      fontFamily: '"Montserrat", sans-serif',
      fontWeight: 300,
    },
    h5: {
      fontFamily: '"Montserrat", sans-serif',
      fontWeight: 300,
    },
    h6: {
      fontFamily: '"Montserrat", sans-serif',
      fontWeight: 300,
    },
  },
});

export default darkTheme;
