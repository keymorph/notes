import {blue, green, indigo, orange, purple, red, teal, yellow,} from "@mui/material/colors";
import {createTheme} from "@mui/material/styles";

// 70% Hex transparency value to append at the end of colors
const hexTransparency = "B3";

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
  },
};

export const darkTheme = createTheme(
  {
    palette: {
      mode: "dark",
      category: {
        none: "#9E9EAF" + hexTransparency,
        red: red[700] + hexTransparency,
        green: green[700] + hexTransparency,
        blue: blue[700] + hexTransparency,
        orange: orange[700] + hexTransparency,
        yellow: yellow[700] + hexTransparency,
        purple: purple[700] + hexTransparency,
        indigo: indigo[700] + hexTransparency,
        teal: teal[700] + hexTransparency,
      },
    },

    // Per Component Theme Style Overrides
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            background: "#000000" + hexTransparency,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            background: "#000000" + hexTransparency,
          },
        },
      },
      MuiPopover: {
        styleOverrides: {
          paper: {
            background: "#000000" + hexTransparency,
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
      category: {
        none: "#9E9EAF" + hexTransparency,
        red: red[500] + hexTransparency,
        green: green[500] + hexTransparency,
        blue: blue[500] + hexTransparency,
        orange: orange[500] + hexTransparency,
        yellow: yellow[500] + hexTransparency,
        purple: purple[500] + hexTransparency,
        indigo: indigo[500] + hexTransparency,
        teal: teal[500] + hexTransparency,
      },
    },

    // Per Component Theme Style Overrides
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            background: "#FFFFFF" + hexTransparency,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            background: "#FFFFFF" + hexTransparency,
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
    },
  },
  commonThemeConfig
);
