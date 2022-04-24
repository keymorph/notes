import LockIcon from "@mui/icons-material/Lock";
import { Alert, Avatar, Box, Card, Collapse, styled } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AuthBox from "../components/Auth/AuthBox";
import getAuthAlertText from "../helpers/alerts/auth-alerts";

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

const sanitizeAction = (action) => {
  switch (action) {
    case "login":
      return "login";
    case "register":
      return "register";
    case "forgot":
      return "forgot";
    default:
      return "login";
  }
};

export default function AuthPage() {
  const router = useRouter();
  const URLQueries = router.query;
  const action = sanitizeAction(URLQueries.action); // default to login

  const { data: session, status: sessionStatus } = useSession();

  // If the user is logged in, redirect to dashboard
  if (session) {
    router.replace("/dashboard");
  }

  const [alertSeverity, setAlertSeverity] = useState("error");
  const [alertText, setAlertText] = useState("");

  // Set the alertText and severity based on which is passed in the URL
  // If nothing is passed in the URL, set the alertText to empty string
  useEffect(() => {
    if (URLQueries.error) {
      setAlertSeverity("error");
      setAlertText(getAuthAlertText(URLQueries.error));
    } else if (URLQueries.success) {
      setAlertSeverity("success");
      setAlertText(getAuthAlertText(URLQueries.success));
    } else {
      setAlertText("");
    }
  }, [URLQueries.error, URLQueries.success]);

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
          <Alert
            sx={{ mt: 2, whiteSpace: "pre-line" }} // pre-line allows new lines "\n" in the text
            variant="outlined"
            severity={alertSeverity}
          >
            {alertText}
          </Alert>
        </Collapse>
        <AuthBox action={action} />
      </Box>
    </AuthCard>
  );
}
