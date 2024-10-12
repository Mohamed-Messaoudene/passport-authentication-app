import { blue, teal } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    background: {
      default: blue[50],
    },
    teal: {
      main: teal[500],
    },
  },
});

export default theme;
