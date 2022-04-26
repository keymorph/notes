import { createTheme } from "@mui/material/styles";

export const ThemeDark = createTheme({
  palette: {
    mode: "dark",
  },

  // Per Component Theme Style Overrides
  components: {
    MuiLoadingButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.palette.primary.dark,
          "&:hover": {
            backgroundColor: theme.palette.primary.main,
            boxShadow: `0 0 0.5rem ${theme.palette.primary.main}`,
          },
          color: theme.palette.primary.contrastText,
          border: 0,
          borderRadius: 20,
        }),
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
        root: ({ theme }) => ({
          backgroundColor: theme.palette.primary.main,
          "&:hover": {
            backgroundColor: theme.palette.primary.light,
            boxShadow: `0 0 0.5rem ${theme.palette.primary.light}`,
          },
          color: theme.palette.primary.contrastText,
          border: 0,
          borderRadius: 20,
        }),
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
