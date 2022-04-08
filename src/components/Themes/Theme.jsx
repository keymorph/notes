import { createTheme } from "@mui/material/styles";

export const ThemeDark = createTheme({
  palette: {
    mode: "dark",
    text: {
      primary: "#ffffff",
    },
  },

  // Per Component Theme Style Overrides
  components: {
    MuiLoadingButton: {
      styleOverrides: {
        root: {
          background: "linear-gradient(45deg, #0176D3 30%, #01ABD3 90%)",
          boxShadow: "0 3px 4px 2px rgba(33, 150, 243, .3)",
          border: 0,
          borderRadius: 20,
        },
        primary: {
          background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
          boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .3)",
          border: 0,
          borderRadius: 20,
        },
        secondary: {
          backgroundColor: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
          boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
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
          background: "linear-gradient(45deg, #1f3091 30%, #0076D0 90%)",
          boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .3)",
          border: 0,
          borderRadius: 20,
        },
        primary: {
          background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
          boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .3)",
          border: 0,
          borderRadius: 20,
        },
        secondary: {
          background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
          boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
          border: 0,
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
