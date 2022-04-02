/*
  This component contains the shared components that are used on all pages.
*/
import { useEffect, useMemo, useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ThemeProvider } from "@mui/material/styles";
import { Container } from "@mui/material";

import { ThemeDark, ThemeLight } from "../components/Themes/Theme";
import Navbar from "../components/Navbar";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  // Check if the browser reports dark mode preference so that it is set as the default mode
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [darkMode, setDarkMode] = useState(prefersDarkMode);

  // Set the theme palette based on the dark mode preference
  const theme = useMemo(() => (darkMode ? ThemeDark : ThemeLight), [darkMode]);

  // Invoke setDarkMode whenever the dark mode preference changes
  useEffect(() => {
    setDarkMode(prefersDarkMode);
  }, [prefersDarkMode]);

  // Change the mode when this function is called
  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
  };

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <title>Jotfox: Note Taking App</title>
      </Head>
      <ThemeProvider theme={theme}>
        <Container
          maxWidth={false}
          disableGutters
          sx={{
            background: darkMode
              ? "linear-gradient(45deg, #1f3091 30%, #0076D0 90%)"
              : "linear-gradient(45deg, #0076D0 30%, #00A0D0 90%)",
            height: "100vh",
            overflowX: "hidden",
          }}
        >
          <Navbar
            darkMode={darkMode}
            handleDarkModeToggle={handleDarkModeToggle}
          />
          {/* Each page is rendered in Component */}
          <Component {...pageProps} />
        </Container>
      </ThemeProvider>
    </>
  );
}
