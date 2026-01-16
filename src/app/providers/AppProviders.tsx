import { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { store } from "@/app/store";
import theme from "@/modules/_shared/styles/theme";
import { useAppInit } from "@/modules/_shared/hooks/useAppInit";

export const AppProviders = ({ children }: PropsWithChildren) => {
  const { isReady } = useAppInit();

  if (!isReady) {
    return null;
  }

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>{children}</BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
};
