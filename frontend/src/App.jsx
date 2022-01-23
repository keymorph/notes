import { useState, useEffect, useMemo } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import "transition-style";

import AuthPage from "./components/Auth/AuthPage";
import Dashboard from "./components/Dashboard/Dashboard";
import Note from "./components/Dashboard/Note/Note";
import ResponsiveAppBar from "./components/Appbar";

import ThemeContext from "./store/theme-context";

export default function App() {
  // Check if the browser reports dark mode preference so that it is set as the default mode
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [darkMode, setDarkMode] = useState(prefersDarkMode);

  // Set the theme palette based on the dark mode preference
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
        },
      }),
    [darkMode]
  );

  // Invoke setDarkMode when the dark mode preference changes
  useEffect(() => {
    setDarkMode(prefersDarkMode);
  }, [prefersDarkMode]);

  // Change the mode when this function is called
  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeContext.Provider value={darkMode ? "dark" : "light"}>
      <ThemeProvider theme={theme}>
        {/* TODO: Apply a transition everytime the user clicks on the theme toggling button */}
        <section transition-style="in:circle:bottom-right">
          <ResponsiveAppBar
            darkMode={darkMode}
            handleDarkModeToggle={handleDarkModeToggle}
          />
          <Router>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/note" element={<Note />} />
            </Routes>
          </Router>
        </section>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}
