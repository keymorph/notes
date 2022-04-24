import { createTheme } from "@mui/material/styles";

export const ThemeDark = createTheme({
  palette: {
    mode: "dark",
    text: {
      primary: "#ffffffE0",
    },
  },

  // Per Component Theme Style Overrides
  components: {
    MuiLoadingButton: {
      styleOverrides: {
        root: {
          backgroundColor: "#056ac5AF",
          "&:hover": {
            backgroundColor: "#056ac5F0",
            boxShadow: "0 0 1rem rgba(0,123,255,0.5)",
          },
          border: 0,
          borderRadius: 20,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 20,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: "#000000AF",
          backdropFilter: "blur(8px)",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: "#000000AF",
          backdropFilter: "blur(8px)",
          borderRadius: 5,
        },
      },
    },
    MuiPopover: {
      styleOverrides: {
        paper: {
          background: "#000000AF",
          backdropFilter: "blur(8px)",
          borderRadius: 5,
        },
      },
    },
  },
});

export const ThemeLight = createTheme({
  palette: {
    mode: "light",
  },

  // Per Component Theme Style Overrides
  components: {
    MuiLoadingButton: {
      styleOverrides: {
        root: {
          backgroundColor: "#00a0d07F",
          "&:hover": {
            backgroundColor: "#00a0d0AF",
            boxShadow: "0 0 1rem rgba(0,123,255,0.5)",
          },
          border: 0,
          borderRadius: 20,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 20,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: "#FFFFFFAF",
          backdropFilter: "blur(8px)",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: "#FFFFFFAF",
          backdropFilter: "blur(8px)",
          borderRadius: 5,
        },
      },
    },
    MuiPopover: {
      styleOverrides: {
        paper: {
          background: "#FFFFFFAF",
          backdropFilter: "blur(8px)",
          borderRadius: 5,
        },
      },
    },
  },
});
