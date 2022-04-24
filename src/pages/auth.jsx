import LockIcon from "@mui/icons-material/Lock";
import { Alert, Avatar, Box, Card, Collapse, styled } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import AuthBox from "../components/Auth/AuthBox";

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

export default function AuthPage() {
  const router = useRouter();
  const URLQueries = router.query;

  const { data: session, status: sessionStatus } = useSession();

  // If the user is logged in, redirect to dashboard
  if (session) {
    router.replace("/dashboard");
  }

  let alertText = "";
  // Check if an error query is present
  if (URLQueries.error === "CredentialsSignin") {
    // Wrong credentials error
    alertText = "Email or password is incorrect.";
  } else if (URLQueries.error) {
    // Other errors
    alertText = URLQueries.error;
  }
  return (
    <AuthCard>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Avatar sx={{ bgcolor: "primary.main", alignSelf: "center" }}>
          <LockIcon />
        </Avatar>
        <Collapse in={!!alertText}>
          <Alert sx={{ mt: 2 }} variant="outlined" severity="error">
            {alertText}
          </Alert>
        </Collapse>
        <AuthBox
          context={URLQueries.context ? URLQueries.context : "login"} // default to login
        />
      </Box>
    </AuthCard>
  );
}
