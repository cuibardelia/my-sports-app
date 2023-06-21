import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#58C98D',
      dark: '#07C282',
      light: '#8ED1AC',
    },
    secondary: {
      main: '#6770D2',
      light: '#677EE9',
      lightFormat: '#DDAFE3',
    },
    accent: {
      main: '#C4E876',
      secondary: '#764EA2',
    },
    background: {
      paper: '#FCFCFC',
      default: '#F5F5F5',
    },
    text: {
      primary: '#30424D',
      secondary: '#6C3D9B',
      disabled: '#F5F5F5',
      // disabled: '#bdbdbd',
      // hint: '#9e9e9e',
    },
  },
});

export default theme;
