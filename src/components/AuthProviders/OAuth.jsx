import { GitHub, Google } from "@mui/icons-material";
import { IconButton, Stack } from "@mui/material";
import { signIn } from "next-auth/react";
import { useSnackbar } from "notistack";
import { PROVIDERS } from "../../models/oauth";

export default function OAuth() {
  const { enqueueSnackbar } = useSnackbar();

  const handleSignIn = async (provider) => {
    await signIn(provider, { callbackUrl: "/dashboard" }).catch((error) => {
      console.error(error.message);
      enqueueSnackbar(`An error occurred while signing in with ${provider}`, {
        variant: "error",
      });
    });
  };

  return (
    <Stack
      direction="row"
      spacing={{ xs: 1, sm: 2, md: 4 }}
      m={0}
      justifyContent="center"
      alignItems="center"
    >
      <IconButton
        onClick={() => handleSignIn(PROVIDERS.google)}
        color="primary"
      >
        <Google sx={{ fontSize: 48 }} />
      </IconButton>
      <IconButton
        onClick={() => handleSignIn(PROVIDERS.github)}
        color="primary"
      >
        <GitHub sx={{ fontSize: 48 }} />
      </IconButton>
    </Stack>
  );
}
