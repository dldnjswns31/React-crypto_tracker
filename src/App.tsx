import Router from "./Router";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "styled-components";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { GlobalStyle } from "./styles/Global";
import { darkTheme, ligthTheme } from "./styles/theme";
import { isDarkAtom } from "./recoil/atoms";

function App() {
  const isDark = useRecoilValue(isDarkAtom);
  return (
    <>
      <ThemeProvider theme={isDark ? darkTheme : ligthTheme}>
        <GlobalStyle />
        <Router />
        <ReactQueryDevtools initialIsOpen={true} />
      </ThemeProvider>
    </>
  );
}

export default App;
