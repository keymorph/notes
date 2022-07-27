import { GitHub, Google } from "@mui/icons-material";
import { IconButton, Stack } from "@mui/material";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

export default function OAuth({ providers }) {
  const router = useRouter();

  const handleSignIn = async (provider) => {
    await signIn((await providers)[provider].id)
      .then(() => {
        router.push("/dashboard");
      })
      .catch(async (error) => {
        console.error(error.message);
        await router.push("/auth?error=Server Error :(");
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
        onClick={() => handleSignIn(providers.google.id)}
        color="primary"
      >
        <Google sx={{ fontSize: 48 }} />
      </IconButton>
      <IconButton
        onClick={() => handleSignIn(providers.github.id)}
        color="primary"
      >
        <GitHub sx={{ fontSize: 48 }} />
      </IconButton>
    </Stack>
  );
}
