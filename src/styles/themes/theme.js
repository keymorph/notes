import {createTheme} from "@mui/material/styles"; // 70% Hex transparency value to append at the end of colors

// 70% Hex transparency value to append at the end of colors
const hexTransparency = "E0";

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
      primary: {
        main: "#AFA2ED",
        contrastText: "#FFF",
      },
      background: {
        appBar: "#171824" + hexTransparency,
      },
      category: {
        none: "#2c3042" + hexTransparency,
        purple: "#322E65" + hexTransparency,
        blue: "#2E4165" + hexTransparency,
        teal: "#2B6259" + hexTransparency,
        green: "#2D6434" + hexTransparency,
        yellow: "#65652D" + hexTransparency,
        orange: "#654B2E" + hexTransparency,
        red: "#652D2F" + hexTransparency,
      },
    },

    // Per Component Theme Style Overrides
    components: {
      MuiButton: {
        styleOverrides: {
          contained: {
            backgroundColor: "#7E5ACB",
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            background: "#1d2133" + hexTransparency,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            background: "#1d2133" + hexTransparency,
          },
        },
      },
      MuiPopover: {
        styleOverrides: {
          paper: {
            background: "#2a2f49" + hexTransparency,
            boxShadow: "0px 0.4em 0.8em rgba(0, 0, 0, 0.4)",
          },
        },
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            backgroundColor: "#2a2f49" + hexTransparency,
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
        contrastText: "#000",
      },
      background: {
        appBar: "#D6D6DA" + hexTransparency,
      },
      category: {
        none: "#CFD1D7",
        purple: "#A09CD6",
        blue: "#9CB6D6",
        teal: "#9CD6CC",
        green: "#9CD6A2",
        yellow: "#D5D69C",
        orange: "#D6BB9C",
        red: "#D69C9C",
      },
    },

    // Per Component Theme Style Overrides
    components: {
      MuiButton: {
        styleOverrides: {
          contained: {
            backgroundColor: "#7E5ACB",
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            background: "#F2F3F5" + hexTransparency,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            background: "#F2F3F5" + hexTransparency,
          },
        },
      },
      MuiPopover: {
        styleOverrides: {
          paper: {
            background: "#FFFFFF" + hexTransparency,
          },
        },
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            backgroundColor: "#FFFFFF" + hexTransparency,
            color: "#000000",
            boxShadow: "0px 0.4em 0.8em rgba(0, 0, 0, 0.25)",
          },
        },
      },
    },
  },
  commonThemeConfig
);
