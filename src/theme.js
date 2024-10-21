// theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#fe4a49', // Berry UI primary color #fe4a49 • #2ab7ca • #fed766 • #e6e6ea • #f4f4f8
    },
    secondary: {
      main: '#2ab7ca', // Berry UI secondary color
    },
    background: {
      default: '#fed766', // Berry UI background
      paper: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: 'Poppins, sans-serif',
    h1: { fontWeight: 700, fontSize: '2.5rem' },
    h2: { fontWeight: 600, fontSize: '2rem' },
    body1: { fontWeight: 400, fontSize: '1rem' },
  },
});

export default theme;
