import LockIcon from "@mui/icons-material/Lock";
import { Avatar, Box, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Credentials from "../components/AuthProviders/Credentials";
import OAuth from "../components/AuthProviders/OAuth";
import { AuthCard } from "../styles/components/cards";

export default function AuthPage() {
  //#region Hooks
  const router = useRouter();
  const { status: sessionStatus } = useSession();

  // If the user is logged in, redirect to dashboard
  if (sessionStatus === "authenticated") {
    router.replace("/dashboard");
  }

  const action = router.query.action ? router.query.action : "login";

  return (
    <AuthCard>
      <Box display="flex" flexDirection="column">
        <Avatar sx={{ bgcolor: "primary.main", alignSelf: "center" }}>
          <LockIcon />
        </Avatar>
        <Credentials
          action={action}
          isUnauthenticated={sessionStatus === "unauthenticated"}
        />
        <Typography
          sx={{
            my: 2,
            textAlign: "center",
          }}
        >
          Or
        </Typography>
        <OAuth />
      </Box>
    </AuthCard>
  );
}
