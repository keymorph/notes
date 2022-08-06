import { Grow, useTheme } from "@mui/material";
import { SnackbarProvider } from "notistack";

export default function CustomSnackbarProvider({ children }) {
  //#region Hooks

  const theme = useTheme();

  //#endregion

  return (
    <SnackbarProvider
      maxSnack={1}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      sx={{
        "& .SnackbarContent-root": {
          mb: "3rem",
          backdropFilter: "blur(6px)",
          textAlign: "center",
          backgroundColor: theme.palette.primary.background,
        },
        "& .SnackbarItem-variantError": {
          color: theme.palette.error.contrastText,
          backgroundColor: theme.palette.error.background,
        },
        "& .SnackbarItem-variantSuccess": {
          color: theme.palette.error.contrastText,
          backgroundColor: theme.palette.success.background,
        },
        "& .SnackbarItem-variantWarning": {
          color: theme.palette.error.contrastText,
          backgroundColor: theme.palette.warning.background,
        },
        "& .SnackbarItem-variantInfo": {
          color: theme.palette.error.contrastText,
          backgroundColor: theme.palette.info.background,
        },
      }}
      TransitionComponent={Grow}
      autoHideDuration={6000}
    >
      {children}
    </SnackbarProvider>
  );
}
