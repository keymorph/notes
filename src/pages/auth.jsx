import { Card } from "@mui/material";
import { getCsrfToken, getProviders, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import LoginBox from "../components/Auth/LoginBox.jsx";
import NoPasswordBox from "../components/Auth/NoPasswordBox";
import RegisterBox from "../components/Auth/RegisterBox";
import { loginUser, registerUser } from "../helpers/user-requests";

export default function AuthPage({ providers, csrfToken }) {
  const router = useRouter();
  const [session, loading] = useSession();

  if (session) {
    router.replace("/dashboard");
  }

  // Handles the state of which box is displayed, default is "login". Options are: "login", "register" and "nopass"
  const [currentBox, setCurrentBox] = useState("login");

  // State handling for the box components
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  // TODO: Handle the forgot password functionality
  const handleForgotPassword = () => {
    return null;
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    const data = {
      email: email,
      password: password,
    };

    await loginUser(data).catch((error) => {
      console.error(error.message);
    });
  };

  const handleRegister = async (event) => {
    event.preventDefault();

    const data = {
      email: email,
      password: password,
    };

    await registerUser(data).catch((error) => {
      console.error(error.message);
    });

    // Log in the user after registration
    await loginUser(data).catch((error) => {
      console.error(error.message);
    });
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
      {currentBox === "login" ? (
        <LoginBox
          setCurrentBox={setCurrentBox}
          handleSubmit={handleLogin}
          setEmail={setEmail}
          setPassword={setPassword}
          setRemember={setRemember}
          email={email}
          password={password}
          remember={remember}
          loading={loading}
        />
      ) : currentBox === "register" ? (
        <RegisterBox
          setCurrentBox={setCurrentBox}
          handleSubmit={handleRegister}
          setEmail={setEmail}
          setPassword={setPassword}
          setRemember={setRemember}
          email={email}
          password={password}
          loading={loading}
        />
      ) : currentBox === "nopass" ? (
        <NoPasswordBox
          setCurrentBox={setCurrentBox}
          handleSubmit={handleForgotPassword}
          setEmail={setEmail}
          email={email}
          loading={loading}
        />
      ) : null}
    </Card>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      providers: await getProviders(), // For OAuth
      csrfToken: getCsrfToken(context), // For credentials authentication
    },
  };
}
