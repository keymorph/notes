import { useState, useEffect, useMemo } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import AuthPage from "./components/Auth/AuthPage";
import Dashboard from "./components/Dashboard/Dashboard";
import Note from "./components/Dashboard/Note/Note";
import Navbar from "./components/Navbar";

import { ThemeDark, ThemeLight } from "./components/UI/Theme";
import { Container } from "@mui/material";

export default function App() {
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
    <ThemeProvider theme={theme}>
      <Container
        maxWidth={false}
        disableGutters
        sx={{
          background: darkMode
            ? "linear-gradient(45deg, #1f3091 30%, #0076D0 90%)"
            : "linear-gradient(45deg, #0076D0 30%, #00A0D0 90%)",
          transition: "background 0.5s ease",
          height: "100vh",
          overflowX: "hidden",
        }}
      >
        <Router>
          <Navbar
            darkMode={darkMode}
            handleDarkModeToggle={handleDarkModeToggle}
          />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/note" element={<Note />} />
          </Routes>
        </Router>
      </Container>
    </ThemeProvider>
  );
}
