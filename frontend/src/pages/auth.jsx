import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Card, Grid } from "@mui/material";
import NoPasswordBox from "../components/Auth/NoPasswordBox";
import LoginBox from "../components/Auth/LoginBox.jsx";
import RegisterBox from "../components/Auth/RegisterBox";

export default function AuthPage() {
  const router = useRouter();

  // Handles the state of which box is displayed, default is "login". Options are: "login", "register" and "nopass"
  const [currentBox, setCurrentBox] = useState("login");

  const [loading, setLoading] = useState(true);

  // State handling for the box components
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  // Verifiy if the user has a valid token (JWT)
  useEffect(() => {
    const token = localStorage.getItem("auth-token");

    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/token`, {
        headers: {
          "auth-token": token, //the token is a variable which holds the token
        },
      })
      .then((result) => {
        console.log(result);
        console.log("VALID TOKEN == GO TO DASHBOARD INSTEAD");
        router.replace("/");
      })
      // No token found, remain on login page
      .catch(() => {
        setLoading(false);
      });
  }, []);

  // TODO: Handle the forgot password functionality
  const handleForgotPassword = () => {
    return null;
  };

  const handleLogin = async (event) => {
    setLoading(true);
    event.preventDefault();

    const data = {
      email: email,
      password: password,
    };

    console.log("DATA", data);

    axios
      .put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user`, data)
      .then((res) => {
        console.log("Entered Res");
        console.log(res);
        localStorage.setItem("auth-token", res.data.accessToken);
        router.replace("/");
      })
      .catch((error) => {
        setLoading(false);
        console.log("Entered Error");
        console.log(error);
      });
  };

  const handleRegister = (event) => {
    setLoading(true);
    event.preventDefault();

    const data = {
      email: email,
      password: password,
    };

    console.log("DATA", data);

    axios
      .post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user`, data)
      .then((res) => {
        console.log("Entered Res");
        console.log(res);
        setLoading(false);
        setCurrentBox("login");
      })
      .catch((error) => {
        setLoading(false);
        console.log("Entered Error");
        console.log(error);
      });
  };

  return (
    // Center Card
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
