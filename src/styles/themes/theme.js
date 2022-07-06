import { createTheme } from "@mui/material/styles"; // 70% Hex transparency value to append at the end of colors

const transparency = {
  default: "D9",
  contrastText: "DE",
};

// Shared theme configuration for all themes
const commonThemeConfig = {
  // Per Component Theme Style Overrides
  components: {
    MuiLoadingButton: {
      styleOverrides: {
        root: ({ theme }) => ({
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
          backdropFilter: "blur(8px)",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backdropFilter: "blur(8px)",
          borderRadius: 5,
        },
      },
    },
    MuiPopover: {
      styleOverrides: {
        paper: {
          backdropFilter: "blur(8px)",
          borderRadius: 5,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          // Ensure the width of the text input is as wide as it can get
          "& > span": {
            width: "100%",
          },
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          paddingTop: 0,
          paddingBottom: 0,
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backdropFilter: "blur(8px)",
        },
      },
    },
  },
};

export const darkTheme = createTheme(
  {
    palette: {
      mode: "dark",
      // All other color variants like light, dark and contrastText are automatically calculated based on the main color
      primary: {
        main: "#C7BCF6",
      },
      error: {
        main: "#ff5b52",
      },
      warning: {
        main: "#F1C64D",
      },
      info: {
        main: "#95EEF1",
      },
      success: {
        main: "#8CEA94",
      },
      neutral: {
        main: "#F5F3FE",
      },
      background: {
        appBar: "#171824" + transparency.default,
      },
      category: {
        none: "#2c3042" + transparency.default,
        purple: "#322E65" + transparency.default,
        blue: "#2E4165" + transparency.default,
        teal: "#2B6259" + transparency.default,
        green: "#2D6434" + transparency.default,
        yellow: "#65652D" + transparency.default,
        orange: "#654B2E" + transparency.default,
        red: "#652D2F" + transparency.default,
      },
    },

    // Per Component Theme Style Overrides
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            background: "#1d2133" + transparency.default,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            background: "#1d2133" + transparency.default,
          },
        },
      },
      MuiPopover: {
        styleOverrides: {
          paper: {
            background: "#2a2f49" + transparency.default,
            boxShadow: "0px 0.4em 0.8em rgba(0, 0, 0, 0.4)",
          },
        },
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            backgroundColor: "#2a2f49" + transparency.default,
            color: "#FFFFFF",
            boxShadow: "0px 0.4em 0.8em rgba(0, 0, 0, 0.4)",
          },
        },
      },
    },
  },
  commonThemeConfig
);

export const lightTheme = createTheme(
  {
    palette: {
      mode: "light",
      primary: {
        main: "#413A7E",
      },
      error: {
        main: "#942727",
      },
      warning: {
        main: "#917111",
      },
      info: {
        main: "#326264",
      },
      success: {
        main: "#245C2D",
      },
      neutral: {
        main: "#120E1A",
      },
      background: {
        appBar: "#D6D6DA" + transparency.default,
      },
      category: {
        none: "#CFD1D7" + transparency.default,
        purple: "#A09CD6" + transparency.default,
        blue: "#9CB6D6" + transparency.default,
        teal: "#9CD6CC" + transparency.default,
        green: "#9CD6A2" + transparency.default,
        yellow: "#D5D69C" + transparency.default,
        orange: "#D6BB9C" + transparency.default,
        red: "#D69C9C" + transparency.default,
      },
    },

    // Per Component Theme Style Overrides
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            background: "#F2F3F5" + transparency.default,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            background: "#F2F3F5" + transparency.default,
          },
        },
      },
      MuiPopover: {
        styleOverrides: {
          paper: {
            background: "#FFFFFF" + transparency.default,
          },
        },
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            backgroundColor: "#FFFFFF" + transparency.default,
            color: "#000000",
            boxShadow: "0px 0.4em 0.8em rgba(0, 0, 0, 0.25)",
          },
        },
      },
    },
  },
  commonThemeConfig
);
