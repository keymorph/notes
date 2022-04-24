import LockIcon from "@mui/icons-material/Lock";
import { Alert, Avatar, Box, Card, Collapse } from "@mui/material";
import { getCsrfToken, getProviders, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import LoginBox from "../components/Auth/LoginBox.jsx";
import NoPasswordBox from "../components/Auth/NoPasswordBox";
import RegisterBox from "../components/Auth/RegisterBox";
import { registerUser } from "../helpers/user-requests";

const alertTexts = {
  login: {
    credentials: "Email or password is incorrect.",
  },
};

export default function AuthPage({ providers, csrfToken }) {
  const router = useRouter();
  const URLQueries = router.query;
  const { data: session, status: sessionStatus } = useSession();

  // If the user is logged in, redirect to dashboard
  if (session) {
    router.replace("/dashboard");
  }

  let alertText = "";
  // Check if an error query is present
  // Wrong credentials error
  if (URLQueries.error === "CredentialsSignin") {
    alertText = alertTexts.login.credentials;
  } else if (URLQueries.error) {
    alertText = URLQueries.error;
  }

  // State handling for the box components
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [emailValid, setEmailValid] = useState(true);

  // TODO: Handle the forgot password functionality
  const handleForgotPassword = () => {
    return null;
  };

  const handleRegister = async (event) => {
    event.preventDefault();

    const data = {
      csrfToken: csrfToken,
      email: email,
      password: password,
    };

    await registerUser(data).catch((error) => {
      console.error(error.message);
    });

    // Send the user to the login page
    await router.push("/user");
  };

  const handleEmailChange = (event) => {
    const email = event.target.value;
    setEmail(email);

    // Check if email is valid
    if (
      email.length > 0 &&
      !email.match(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/)
    ) {
      setEmailValid(false);
    } else {
      setEmailValid(true);
    }
  };

  return (
    <Card
      sx={{
        padding: 3,
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.25)",
        borderRadius: 5,
        width: "80%",
        maxWidth: "30rem",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
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
        {
          // If the current box is not specified, show login by default
          !URLQueries.current ? (
            <LoginBox
              handleEmailChange={handleEmailChange}
              emailValid={emailValid}
              setEmail={setEmail}
              setPassword={setPassword}
              setRemember={setRemember}
              email={email}
              password={password}
              remember={remember}
              loading={sessionStatus === "loading"}
              csrfToken={csrfToken}
            />
          ) : URLQueries.current === "register" ? (
            <RegisterBox
              handleSubmit={handleRegister}
              handleEmailChange={handleEmailChange}
              emailValid={emailValid}
              setEmail={setEmail}
              setPassword={setPassword}
              setRemember={setRemember}
              email={email}
              password={password}
              loading={sessionStatus === "loading"}
            />
          ) : URLQueries.current === "forgot" ? (
            <NoPasswordBox
              handleSubmit={handleForgotPassword}
              handleEmailChange={handleEmailChange}
              emailValid={emailValid}
              setEmail={setEmail}
              email={email}
              loading={sessionStatus === "loading"}
            />
          ) : null
        }
      </Box>
    </Card>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      providers: await getProviders(), // For OAuth
      csrfToken: await getCsrfToken(context), // For credential auth
    },
  };
}
