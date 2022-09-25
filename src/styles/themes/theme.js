import { createTheme } from "@mui/material/styles"; // 70% Hex transparency value to append at the end of colors

const transparency = {
  default: "D9",
  contrastText: "DE",
};

export const categoryColors = {
  dark: {
    categoryNone: {
      main: "#2c3042" + transparency.default,
      contrastText: "#FFFFFF" + transparency.contrastText,
    },
    categoryPurple: {
      main: "#322E65" + transparency.default,
      contrastText: "#FFFFFF" + transparency.contrastText,
    },
    categoryBlue: {
      main: "#2E4165" + transparency.default,
      contrastText: "#FFFFFF" + transparency.contrastText,
    },
    categoryTeal: {
      main: "#2B6259" + transparency.default,
      contrastText: "#FFFFFF" + transparency.contrastText,
    },
    categoryGreen: {
      main: "#2D6434" + transparency.default,
      contrastText: "#FFFFFF" + transparency.contrastText,
    },
    categoryYellow: {
      main: "#65652D" + transparency.default,
      contrastText: "#FFFFFF" + transparency.contrastText,
    },
    categoryOrange: {
      main: "#654B2E" + transparency.default,
      contrastText: "#FFFFFF" + transparency.contrastText,
    },
    categoryRed: {
      main: "#652D2F" + transparency.default,
      contrastText: "#FFFFFF" + transparency.contrastText,
    },
  },
  light: {
    categoryNone: {
      main: "#CFD1D7" + transparency.default,
      contrastText: "#000000" + transparency.contrastText,
    },
    categoryPurple: {
      main: "#A09CD6" + transparency.default,
      contrastText: "#000000" + transparency.contrastText,
    },
    categoryBlue: {
      main: "#9CB6D6" + transparency.default,
      contrastText: "#000000" + transparency.contrastText,
    },
    categoryTeal: {
      main: "#9CD6CC" + transparency.default,
      contrastText: "#000000" + transparency.contrastText,
    },
    categoryGreen: {
      main: "#9CD6A2" + transparency.default,
      contrastText: "#000000" + transparency.contrastText,
    },
    categoryYellow: {
      main: "#D5D69C" + transparency.default,
      contrastText: "#000000" + transparency.contrastText,
    },
    categoryOrange: {
      main: "#D6BB9C" + transparency.default,
      contrastText: "#000000" + transparency.contrastText,
    },
    categoryRed: {
      main: "#D69C9C" + transparency.default,
      contrastText: "#000000" + transparency.contrastText,
    },
  },
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
          transition: "all 0.2s ease-in-out",
        }),
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          transition: "all 0.2s ease-in-out",
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
    MuiFab: {
      styleOverrides: {
        root: {
          backdropFilter: "blur(6px)",
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
        contrastText: "#000000",
        background: "#C7BCF6" + transparency.default,
      },
      error: {
        main: "#FF9090",
        contrastText: "#000000",
        background: "#FF9090" + transparency.default,
      },
      warning: {
        main: "#F1C64D",
        contrastText: "#000000",
        background: "#F1C64D" + transparency.default,
      },
      info: {
        main: "#95EEF1",
        contrastText: "#000000",
        background: "#95EEF1" + transparency.default,
      },
      success: {
        main: "#8CEA94",
        contrastText: "#000000",
        background: "#8CEA94" + transparency.default,
      },
      neutral: {
        main: "#F5F3FE",
        contrastText: "#000000",
        background: "#F5F3FE" + transparency.default,
      },

      ...categoryColors.dark,

      chipNeutral: {
        main: "#9997A1",
        contrastText: "#1F1F1F",
      },
      background: {
        base: "#0D0E16",
        appBar: "#171824" + transparency.default,
        inactive: "#2A2F49" + transparency.default,
        active: "#34395b" + transparency.default,
      },
    },

    // Per Component Theme Style Overrides
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            background: "#1D2133" + transparency.default,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            background: "#1D2133" + transparency.default,
          },
        },
      },
      MuiPopover: {
        styleOverrides: {
          paper: {
            background: "#2A2F49" + transparency.default,
            boxShadow: "0px 0.4em 0.8em rgba(0, 0, 0, 0.4)",
          },
        },
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            backgroundColor: "#2A2F49" + transparency.default,
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
        contrastText: "#FFFFFF",
        background: "#413A7E" + transparency.default,
      },
      error: {
        main: "#942727",
        contrastText: "#FFFFFF",
        background: "#942727" + transparency.default,
      },
      warning: {
        main: "#917111",
        contrastText: "#FFFFFF",
        background: "#917111" + transparency.default,
      },
      info: {
        main: "#326264",
        contrastText: "#FFFFFF",
        background: "#326264" + transparency.default,
      },
      success: {
        main: "#245C2D",
        contrastText: "#FFFFFF",
        background: "#245C2D" + transparency.default,
      },
      neutral: {
        main: "#120E1A",
        contrastText: "#FFFFFF",
        background: "#120E1A" + transparency.default,
      },

      ...categoryColors.light,

      chipNeutral: {
        main: "#6f6a75",
        contrastText: "#FFFFFF",
      },
      background: {
        base: "#B3B2B8",
        appBar: "#D6D6DA" + transparency.default,
        inactive: "#F2F3F5" + transparency.default,
        active: "#FCFDFF" + transparency.default,
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
