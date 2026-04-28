import { createTheme } from '@mui/material/styles';
import { act } from 'react';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    menu:{
        active: '#f1f1f1',
    
    },
    background: {
      default: '#f2f2f2',
      paper: '#ffffff',
    },
    text: {
      primary: '#212121',
      secondary: '#5f6368',
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
      fontWeight: 800,
    },
    h2: {
      fontFamily: '"Montserrat", sans-serif',
      fontWeight: 600,
    },
    h3: {
      fontFamily: '"Montserrat", sans-serif',
      fontWeight: 500,
    },
    h4: {
      fontFamily: '"Montserrat", sans-serif',
      fontWeight: 800,
    },
    h5: {
      fontFamily: '"Montserrat", sans-serif',
      fontWeight: 500,
    },
    h6: {
      fontFamily: '"Montserrat", sans-serif',
      fontWeight: 300,
    },
  },
});

export default lightTheme;
