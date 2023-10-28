import React from "react";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import store, { persistor } from "@/redux/store/store";
import createEmotionCache from "@/utils/createEmotionCache";
import NextNProgress from "nextjs-progressbar";
import { CacheProvider } from "@emotion/react";
import "@/styles/globals.css";
import "@/components/Home/MySwipeableComponent.css";

const createCachTheme = createEmotionCache();
const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const theme = createTheme({
    typography: {
      fontFamily: "iran-sans",
    },
  });

  const getLayout = Component.getLayout ?? ((page: React.ReactElement) => page);
  return (
    <CacheProvider value={createCachTheme}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <NextNProgress />
              {getLayout(<Component {...pageProps} />)}
            </ThemeProvider>
          </QueryClientProvider>
        </PersistGate>
      </Provider>
    </CacheProvider>
  );
}
