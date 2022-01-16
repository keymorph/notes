import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { Card, Grid } from "@mui/material";
import LoginBox from "./LoginBox";

export default function LoginPage() {
  const history = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const handleSubmit = async (event: any) => {
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
      })
      .catch((error) => {
        console.log("Entered Error");
        console.log(error);
      });
  };

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
          background: "#FFFFFFAA",
        }}
      >
        <LoginBox
          handleSubmit={handleSubmit}
          setEmail={setEmail}
          setPassword={setPassword}
          setRemember={setRemember}
          remember={remember}
        />
      </Card>
    </Grid>
  );
}
