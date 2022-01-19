import axios from "axios";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";

import { Card, Grid } from "@mui/material";
import NoPasswordBox from "./NoPasswordBox";
import LoginBox from "./LoginBox";
import RegisterBox from "./RegisterBox";

import appTheme from "../UI/Theme";
import { ThemeProvider } from "@mui/material/styles";

export default function AuthPage() {
  const navigate = useNavigate();

  useEffect(() => {
    verifyJWT();
  }, []);

  const url = "http://localhost:8000/api";

  const verifyJWT = () => {
    const token = localStorage.getItem("auth-token")
    console.log(token)

    axios
      .get(`${url}/token`, {
         headers: {
           'auth-token': token //the token is a variable which holds the token
         }
        })
      .then((result) => {
        console.log(result)
        console.log("VALID TOKEN == GO TO DASHBOARD INSTEAD")
        navigate("../", { replace: true });
      })
      .catch((err) => {
        console.log("STAY IN LOGIN")
        setShowPage(true)
      });
  };

  // Handles the state of which box is displayed, default is "login". Options are: "login", "register" and "nopass"
  const [currentBox, setCurrentBox] = useState("login");
  
  // State handling for the box components
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPage, setShowPage] = useState(false);

  // To be completed
  const handleForgotPassword = () => {
    return null;
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    const data = {
      email: email,
      password: password,
    };

    console.log(data);

    axios
      .put("http://localhost:8000/api/user", data)
      .then((res) => {
        console.log("Entered Res");
        console.log(res);
        localStorage.setItem("auth-token", res.data.accessToken);
        navigate("../", { replace: true });
      })
      .catch((error) => {
        console.log("Entered Error");
        console.log(error);
      });
  };

  const handleRegister = async (event) => {
    event.preventDefault();

    const data = {
      email: email,
      password: password,
    };

    console.log(data);

    axios
      .post("http://localhost:8000/api/user", data)
      .then((res) => {
        console.log("Entered Res");
        console.log(res);
      })
      .catch((error) => {
        console.log("Entered Error");
        console.log(error);
      });
  };

  if (!showPage)
    return null
  else 
    return (
      <Grid
        container
        justifyContent={"center"}
        alignItems={"center"}
        sx={{
          height: "100vh",
          width: "100vw",
          background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
        }}
      >
        <Card
          sx={{
            padding: 3,
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.25)",
            borderRadius: 5,
            width: "70%",
            maxWidth: "400px",
            background: "#FFFFFFBB",
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
            />
          ) : currentBox === "register" ? (
            <RegisterBox
              setCurrentBox={setCurrentBox}
              handleSubmit={handleRegister}
              setEmail={setEmail}
              setPassword={setPassword}
              email={email}
              password={password}
            />
          ) : currentBox === "nopass" ? (
            <NoPasswordBox
              setCurrentBox={setCurrentBox}
              handleSubmit={handleForgotPassword}
              setEmail={setEmail}
              email={email}
            />
          ) : null}
        </Card>
      </Grid>
    );
}
