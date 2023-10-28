import { extendTheme } from '@chakra-ui/react';
import { createTheme } from '@mui/material';

export const notFoundtheme = extendTheme({
  colors: {
    blue: {
      400: '#3B82F6',
      500: '#2563EB',
      600: '#1D4ED8',
    },
  },
});

export const theme = createTheme({
  typography: {
    fontFamily: 'iran-sans',
  },
});
