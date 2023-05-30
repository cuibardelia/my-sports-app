import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#8884d8',
      dark: '#5a5487',
    },
    secondary: {
      main: '#9dd45b',
    },
    text: {
      primary: '#333333',
      secondary: '#e0e0ff',
      // disabled: '#bdbdbd',
      // hint: '#9e9e9e',
    },
  },
});

export default theme;
