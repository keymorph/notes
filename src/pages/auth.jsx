import LockIcon from "@mui/icons-material/Lock";
import {
  Alert,
  Avatar,
  Box,
  Card,
  Collapse,
  styled,
  Typography,
} from "@mui/material";
import { unstable_getServerSession } from "next-auth";
import { getProviders } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Credentials from "../components/AuthProviders/Credentials";
import OAuth from "../components/AuthProviders/OAuth";
import getAuthAlertText from "../helpers/validation-strings/auth-alerts";
import { authOptions } from "./api/auth/[...nextauth]";

const AuthCard = styled(Card)({
  padding: 25,
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.25)",
  borderRadius: 25,
  width: "80%",
  maxWidth: "30rem",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
});

export default function AuthPage({ user, oauthProviders }) {
  //#region Hooks
  const router = useRouter();

  const [alertSeverity, setAlertSeverity] = useState("error");
  const [alertText, setAlertText] = useState("");

  // Set the alertText and severity based on which is passed in the URL
  // If nothing is passed in the URL, set the alertText to empty string
  useEffect(() => {
    if (router.query.error) {
      setAlertSeverity("error");
      setAlertText(getAuthAlertText(router.query.error));
    } else if (router.query.success) {
      setAlertSeverity("success");
      setAlertText(getAuthAlertText(router.query.success));
    } else {
      setAlertText("");
    }
  }, [router.query.error, router.query.success]);
  //#endregion

  // If the user is logged in, redirect to dashboard
  if (user) {
    router.replace("/dashboard");
  }

  const action = router.query.action ? router.query.action : "login";

  return (
    <AuthCard>
      <Box display="flex" flexDirection="column">
        <Avatar sx={{ bgcolor: "primary.main", alignSelf: "center" }}>
          <LockIcon />
        </Avatar>
        <Collapse in={!!alertText}>
          <Alert
            sx={{ mt: 2, whiteSpace: "pre-line" }} // pre-line allows new lines "\n" in the text
            variant="outlined"
            severity={alertSeverity}
          >
            {alertText}
          </Alert>
        </Collapse>
        <Credentials action={action} />
        <Typography
          sx={{
            my: 2,
            textAlign: "center",
          }}
        >
          Or
        </Typography>
        <OAuth providers={oauthProviders} />
      </Box>
    </AuthCard>
  );
}

export async function getServerSideProps(context) {
  const session = unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  return {
    props: {
      user: (await session?.user) || null,
      oauthProviders: await getProviders(),
    },
  };
}
