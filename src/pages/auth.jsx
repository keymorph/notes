import { Card } from "@mui/material";
import { getCsrfToken, getProviders, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import LoginBox from "../components/Auth/LoginBox.jsx";
import NoPasswordBox from "../components/Auth/NoPasswordBox";
import RegisterBox from "../components/Auth/RegisterBox";
import { registerUser } from "../helpers/user-requests";

export default function AuthPage({ providers, csrfToken }) {
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();

  // If the user is logged in, redirect to dashboard
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
    // const data = {
    //   csrfToken: csrfToken,
    //   email: email,
    //   password: password,
    // };
    // Log in the user and redirect to dashboard
    // loginUser(data)
    //   .then(async (res) => {
    //     const updatedSession = await getSession();
    //     console.log(updatedSession);
    //     if (updatedSession) {
    //       await router.push("/dashboard");
    //     }
    //   })
    //   .catch((error) => {
    //     console.error(error.message);
    //   });
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

    await router.push("/user");
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
          loading={sessionStatus === "loading"}
          csrfToken={csrfToken}
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
          loading={sessionStatus === "loading"}
        />
      ) : currentBox === "nopass" ? (
        <NoPasswordBox
          setCurrentBox={setCurrentBox}
          handleSubmit={handleForgotPassword}
          setEmail={setEmail}
          email={email}
          loading={sessionStatus === "loading"}
        />
      ) : null}
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
