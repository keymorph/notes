import { LoadingButton } from "@mui/lab";
import {
  Box,
  Checkbox,
  Collapse,
  FormControlLabel,
  Grid,
  Link as MUILink,
  TextField,
} from "@mui/material";
import { getCsrfToken, getProviders, signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

import { registerUser } from "../../helpers/user-requests";
import {
  getConfirmPasswordErrorText,
  isConfirmPasswordValid,
  isEmailValid,
  isPasswordValid,
} from "../../utils/validate-credentials";

export default function AuthBox({ providers, csrfToken, context }) {
  const router = useRouter();

  // Input data
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [remember, setRemember] = useState(false);
  // Validation flags
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [confirmPasswordValid, setConfirmPasswordValid] = useState(true);
  // Error messages
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  // Submit Button
  const [submitButtonLoading, setSubmitButtonLoading] = useState(false);

  // Ensure that password does not persist between renders
  const handleContextChange = () => {
    setTimeout(() => {
      setPassword("");
      setConfirmPassword("");
      setPasswordValid(true);
      setConfirmPasswordValid(true);
      setPasswordError("");
      setConfirmPasswordError("");
    }, 300);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("handleLogin");
    setSubmitButtonLoading(true);
    signIn("credentials", { email: email, password: password })
      .then((res) => {
        console.log("User is signed in: ", res);
      })
      .catch((error) => {
        console.log("Error signing in: ", error.message);
      });
    setSubmitButtonLoading(false);
  };

  const handleRegister = async (event) => {
    event.preventDefault();

    const data = {
      csrfToken: csrfToken,
      email: email,
      password: password,
    };

    // TODO: Handle the forgot password functionality
    const handleForgotPassword = async (event) => {
      event.preventDefault();
      console.log("handleForgotPassword");
    };

    setSubmitButtonLoading(true);
    registerUser(data)
      .then(async () => {
        // Send the user to the login page
        await router.push("/auth?context=login");
      })
      .catch(async (error) => {
        // If an error is thrown, append it as a query param to the url
        await router.push(`/auth?context=register&error=${error.message}`);
      });
    setSubmitButtonLoading(false);
  };

  const handleEmailChange = (event) => {
    const email = event.target.value;
    setEmail(email);

    // Update state depending on whether the email is valid
    setEmailValid(isEmailValid(email));
    setEmailError(!isEmailValid(email) ? "Invalid email entered." : "");
  };

  const handlePasswordChange = (event) => {
    const password = event.target.value;
    setPassword(password);

    // Update state depending on whether the password is valid
    setPasswordValid(isPasswordValid(password));
    console.log(isPasswordValid(password));
    setPasswordError(
      !isPasswordValid(password) ? "Invalid password entered." : ""
    );
    // Also update the state of confirm password upon changing password
    setConfirmPasswordValid(
      isConfirmPasswordValid(
        confirmPassword,
        password,
        isPasswordValid(password)
      )
    );
    setConfirmPasswordError(
      getConfirmPasswordErrorText(
        confirmPassword,
        password,
        isPasswordValid(password)
      )
    );
  };

  const handleConfirmPasswordChange = (event) => {
    const confirmPassword = event.target.value;
    setConfirmPassword(confirmPassword);

    // Update state depending on whether the password is valid
    setConfirmPasswordValid(
      isConfirmPasswordValid(confirmPassword, password, passwordValid)
    );
    setConfirmPasswordError(
      getConfirmPasswordErrorText(confirmPassword, password, passwordValid)
    );
  };

  return (
    <Box
      component="form"
      onSubmit={
        context === "login"
          ? handleLogin
          : context === "register"
          ? handleRegister
          : null
      }
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
        defaultValue={csrfToken}
        sx={{
          display: "none",
        }}
      />
      <TextField
        error={!emailValid}
        helperText={emailError}
        required
        label="Email Address"
        name="email"
        type="text"
        value={email}
        autoComplete="email"
        onChange={handleEmailChange}
        fullWidth
        margin="normal"
      />
      {/* Don't display the password field for forgot password */}
      <Collapse sx={{ width: "100%" }} in={context !== "forgot"}>
        <TextField
          error={!passwordValid}
          helperText={passwordError}
          required
          label="Password"
          name="password"
          type="password"
          value={password}
          autoComplete="current-password"
          onChange={handlePasswordChange}
          margin="normal"
          fullWidth
        />
      </Collapse>
      {/* Display "Confirm Password" for register only */}
      <Collapse sx={{ width: "100%" }} in={context === "register"}>
        <TextField
          error={!(passwordValid && confirmPasswordValid) && confirmPassword}
          helperText={confirmPasswordError}
          required
          label="Confirm Password"
          name="password"
          type="password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          margin="normal"
          fullWidth
        />
      </Collapse>
      {/* Display "Remember Me" and "Forgot Password?" for login only */}
      <Collapse sx={{ width: "100%" }} in={context === "login"}>
        <Grid container justifyContent="space-between">
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
            checked={remember}
            onChange={(event) => setRemember(event.target.checked)}
          />
          <Link href="/auth?context=forgot" passHref>
            <MUILink sx={{ alignSelf: "center" }} variant="body2">
              Forgot password?
            </MUILink>
          </Link>
        </Grid>
      </Collapse>
      {}
      <LoadingButton
        loading={submitButtonLoading}
        type="submit"
        fullWidth
        variant="contained"
        disabled={!(emailValid && passwordValid && confirmPasswordValid)}
        sx={{ mt: 3, mb: 3 }}
      >
        {context === "login" && "login"}
        {context === "register" && "register"}
        {context === "forgot" && "Send Confirmation Code"}
      </LoadingButton>
      {/* Display the respective footer link depending on the context */}
      <Collapse in={context === "register"}>
        <Link href="/auth?context=login" passHref>
          <MUILink variant="body2" onClick={handleContextChange}>
            Already have an account? Log in!
          </MUILink>
        </Link>
      </Collapse>
      <Collapse in={context === "login" || context === "forgot"}>
        <Link href="/auth?context=register" passHref>
          <MUILink variant="body2" onClick={handleContextChange}>
            {"Don't have an account yet? Create one!"}
          </MUILink>
        </Link>
      </Collapse>
    </Box>
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
