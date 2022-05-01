import { GitHub, Google } from "@mui/icons-material";
import { IconButton, Stack } from "@mui/material";
import { getProviders, signIn } from "next-auth/react";
import { useRouter } from "next/router";

export default function OAuth() {
  const router = useRouter();
  const providers = getProviders();

  const handleGithubSignIn = async () => {
    await signIn((await providers)["github"].id).catch(async (error) => {
      console.error(error.message);
      await router.push("/auth?error=Server Error :(");
    });
  };
  const handleGoogleSignIn = async () => {
    await signIn((await providers)["google"].id).catch(async (error) => {
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
      <IconButton onClick={handleGoogleSignIn} color="primary">
        <Google sx={{ fontSize: 48 }} />
      </IconButton>
      <IconButton onClick={handleGithubSignIn} color="primary">
        <GitHub sx={{ fontSize: 48 }} />
      </IconButton>
    </Stack>
  );
}
