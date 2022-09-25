/*
  This component contains the shared Components and providers that are used on all pages.
*/
import { Container, CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";
import React, { useEffect, useMemo, useState } from "react";

import ScrollTop from "../components/Dashboard/NotesTimeline/ScrollTop";
import Navbar from "../components/Navbar";
import CustomSnackbarProvider from "../components/Providers/CustomSnackbarProvider";
import { darkTheme, lightTheme } from "../styles/themes/theme";

const queryClient = new QueryClient();

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const [darkMode, setDarkMode] = useState(null);
  // Set the theme palette based on the dark mode preference
  const theme = useMemo(() => (darkMode ? darkTheme : lightTheme), [darkMode]);

  // Operations to perform when the page loads
  useEffect(() => {
    // If preference was set in localStorage, dont check the browser preference
    // else check the browser preference so that it is set as the default mode
    if (localStorage.getItem("mode")) {
      setDarkMode(JSON.parse(localStorage.getItem("mode")) === "dark");
    } else {
      setDarkMode(window.matchMedia("(prefers-color-scheme: dark)").matches);
    }
  }, []);

  useEffect(() => {
    document.documentElement.style.backgroundColor =
      theme.palette.background.base;
    document.body.style.backgroundColor = theme.palette.background.base;
  }, [theme]);

  // Change the mode when this function is called
  // Store the preference in localStorage
  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("mode", JSON.stringify(!darkMode ? "dark" : "light"));
  };

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <meta property="og:title" content="Notes — Keymorph" />
        <meta
          property="og:description"
          content="A free web application for creating and editing notes with rich text formatting and markdown support."
        />
        <meta property="og:type" content="website" />
        <meta
          property={"og:image"}
          content={"https://i.imgur.com/0JksycM.png"}
        />
        <title>Notes — Keymorph</title>
      </Head>
      <SessionProvider session={session}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <CustomSnackbarProvider>
              {/* Allows Switching between dark and light modes for native Components such as scrollbars*/}
              <CssBaseline enableColorScheme />
              {/* While the page loads, don't display any content */}
              {/* This prevents the theme from changing after the page has loaded */}
              {darkMode !== null ? (
                <Container
                  maxWidth={false} // Remove default max width
                  disableGutters
                  sx={{
                    minHeight: "100vh",
                    height: "100%",
                    userSelect: "none",
                  }}
                >
                  <Navbar
                    darkMode={darkMode}
                    handleDarkModeToggle={handleDarkModeToggle}
                  />
                  {/* Each page is rendered in Component */}
                  <Component {...pageProps} />
                  <ScrollTop />
                </Container>
              ) : null}
            </CustomSnackbarProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </SessionProvider>
    </>
  );
}
