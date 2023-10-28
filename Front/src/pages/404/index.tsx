import PageNotFound from '@/components/404/PageNotFound';
import { notFoundtheme, theme } from '@/components/Theme/Theme';
import { ChakraProvider } from '@chakra-ui/react';
import { CssBaseline, ThemeProvider } from '@mui/material';

export default function NotFound() {
  return (
    <ThemeProvider theme={theme}>
      <ChakraProvider theme={notFoundtheme}>
        <CssBaseline />
        <PageNotFound />
      </ChakraProvider>
    </ThemeProvider>
  );
}
