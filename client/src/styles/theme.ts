import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// A custom theme for this app
export const theme = createTheme({
  palette: {
    primary: {
      main: '#3B2D2D',
      dark: '#000',
      light: '#898181'
    },
    secondary: {
      main: '#b1abab',
    },
    error: {
      main: red.A400,
    },
  },
});