import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  Link as MUILink,
  TextField,
} from "@mui/material";
import Link from "next/link";
import { useState } from "react";

import CustomButton from "../Themes/Custom/Button";

export default function LoginBox(props) {
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

  return (
    <Box
      component="form"
      method="post"
      action="/api/auth/callback/credentials"
      noValidate
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        alignItems: "center",
      }}
    >
      {/* Ensures that the csrf token is passed upon submitting the form */}
      <TextField
        name="csrfToken"
        type="hidden"
        defaultValue={props.csrfToken}
        sx={{
          display: "none",
        }}
      />
      <TextField
        autoFocus
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
      <Grid container justifyContent="space-between">
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
          checked={props.remember}
          onChange={(event) => props.setRemember(event.target.checked)}
        />
        <Link href="/auth?current=forgot" passHref>
          <MUILink sx={{ alignSelf: "center" }} variant="body2">
            Forgot password?
          </MUILink>
        </Link>
      </Grid>
      <CustomButton
        loading={props.loading}
        type="submit"
        fullWidth
        variant="contained"
        disabled={props.email === "" || props.password === ""}
        sx={{ mt: 3, mb: 3 }}
      >
        Sign In
      </CustomButton>
      <Link href="/auth?current=register" passHref>
        <MUILink variant="body2">
          {"Don't have an account yet? Create one!"}
        </MUILink>
      </Link>
    </Box>
  );
}
