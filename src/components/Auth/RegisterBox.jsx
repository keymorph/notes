import { Box, Link as MUILink, TextField } from "@mui/material";
import Link from "next/link";
import { useState } from "react";

import CustomButton from "../Themes/Custom/Button";

export default function RegisterBox(props) {
  const [comfirmPassword, setComfirmPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState(true);

  const handlePasswordChange = (event) => {
    const password = event.target.value;
    props.setPassword(password);

    // Check if password is valid
    if (password.length < 8 && password.length > 0) {
      setPasswordValid(false);
    } else {
      setPasswordValid(true);
    }
  };
  const handleComfirmPasswordChange = (event) => {
    setComfirmPassword(event.target.value);
  };

  return (
    <Box
      component="form"
      onSubmit={props.handleSubmit}
      noValidate
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        alignItems: "center",
      }}
    >
      <TextField
        error={!props.emailValid}
        helperText={!props.emailValid ? "Invalid email entered." : ""}
        required
        label="Email Address"
        name="email"
        type="email"
        autoComplete="email"
        onChange={props.handleEmailChange}
        defaultValue={props.email}
        fullWidth
        margin="normal"
        sx={{ borderRadius: 100 }}
      />
      <TextField
        error={!passwordValid}
        helperText={
          !passwordValid ? "The password must have at least 8 characters." : ""
        }
        required
        label="Password"
        name="password"
        type="password"
        autoComplete="current-password"
        onChange={handlePasswordChange}
        margin="normal"
        fullWidth
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Confirm Password"
        type="password"
        autoComplete="current-password"
        onChange={handleComfirmPasswordChange}
      />
      <CustomButton
        loading={props.loading}
        type="submit"
        fullWidth
        variant="contained"
        color="secondary"
        disabled={
          props.email === "" ||
          props.password === "" ||
          !props.emailValid ||
          !passwordValid ||
          comfirmPassword !== props.password
        }
        sx={{ mt: 3, mb: 3 }}
      >
        Register
      </CustomButton>
      <Link href="/auth" passHref>
        <MUILink variant="body2">Already have an account? Log in!</MUILink>
      </Link>
    </Box>
  );
}
