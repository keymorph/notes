import { LoadingButton } from "@mui/lab";
import {
  Box,
  CircularProgress,
  Collapse,
  Link as MUILink,
  TextField,
} from "@mui/material";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

import { registerUser } from "../../helpers/requests/user-requests";
import {
  getConfirmPasswordErrorText,
  getPasswordErrorText,
} from "../../helpers/validation-strings/auth-input";
import {
  isConfirmPasswordValid,
  isEmailValid,
  isPasswordValid,
} from "../../utils/input-validation/validate-credentials";

export default function Credentials({ action }) {
  const router = useRouter();

  // Input data state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [remember, setRemember] = useState(false);
  // Validation flags state
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [confirmPasswordValid, setConfirmPasswordValid] = useState(true);
  // Error messages state
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  // Submit Button state
  const [submitButtonLoading, setSubmitButtonLoading] = useState(false);

  const submitButtonDisabled =
    !email ||
    !emailValid ||
    !password ||
    !passwordValid ||
    (action === "register" && !confirmPassword) ||
    !confirmPasswordValid;

  // Ensure that password and other states are handled between action changes
  const handleActionChange = () => {
    setConfirmPassword("");
    setConfirmPasswordValid(true);
    setConfirmPasswordError("");
    setSubmitButtonLoading(false);
  };

  /*
   * On Submit handlers
   */
  const handleLogin = async (event) => {
    event.preventDefault();

    const data = {
      email: email,
      password: password,
      redirect: false,
    };

    // No need to redirect as next-auth handles that
    setSubmitButtonLoading(true);
    await signIn("credentials", data).catch(async (error) => {
      console.error("Error signing in: ", error.message);
      await router.push("/auth?action=login&error=Server Error :(");
    });
    setSubmitButtonLoading(false);
  };

  const handleRegister = async (event) => {
    event.preventDefault();

    const data = {
      email: email,
      password: password,
    };

    setSubmitButtonLoading(true);
    await registerUser(data)
      .then(async () => {
        // Send the user to the login page
        await router.push("/auth?action=login&success=RegisterSuccess");
      })
      .catch(async (error) => {
        const status = error.response?.status;
        // If an error is thrown, append it as a query param to the url
        await router.push(
          `/auth?action=register&error=${
            status === 409 ? "EmailTaken" : error.message
          }`
        );
      });
    handleActionChange();
    setSubmitButtonLoading(false);
  };

  // TODO: Handle the forgot password functionality
  const handleForgotPassword = async (event) => {
    event.preventDefault();
  };

  /*
   * On Change handlers
   */
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
    setPasswordError(getPasswordErrorText(password));

    // Also update the state of confirm password upon changing password
    setConfirmPasswordValid(isConfirmPasswordValid(confirmPassword, password));
    setConfirmPasswordError(
      getConfirmPasswordErrorText(confirmPassword, password)
    );
  };

  const handleConfirmPasswordChange = (event) => {
    const confirmPassword = event.target.value;
    setConfirmPassword(confirmPassword);

    // Update state depending on whether the password is valid
    setConfirmPasswordValid(isConfirmPasswordValid(confirmPassword, password));
    setConfirmPasswordError(
      getConfirmPasswordErrorText(confirmPassword, password)
    );
  };

  return (
    <Box
      component="form"
      onSubmit={
        action === "login"
          ? handleLogin
          : action === "register"
          ? handleRegister
          : handleForgotPassword
      }
      noValidate
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        alignItems: "center",
      }}
    >
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
      <Collapse sx={{ width: "100%" }} in={action !== "forgot"}>
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
      <Collapse sx={{ width: "100%" }} in={action === "register"}>
        <TextField
          error={
            confirmPassword.length !== 0 &&
            (!passwordValid || !confirmPasswordValid)
          }
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
      {/*<Collapse sx={{ width: "100%" }} in={action === "login"}>*/}
      {/*  <Grid container justifyContent="space-between">*/}
      {/*    <FormControlLabel*/}
      {/*      control={<Checkbox value="remember" color="primary" />}*/}
      {/*      label="Remember me"*/}
      {/*      checked={remember}*/}
      {/*      onChange={(event) => setRemember(event.target.checked)}*/}
      {/*    />*/}
      {/*    <Link href="/auth?action=forgot" passHref>*/}
      {/*      <MUILink sx={{ alignSelf: "center" }} variant="body2">*/}
      {/*        Forgot password?*/}
      {/*      </MUILink>*/}
      {/*    </Link>*/}
      {/*  </Grid>*/}
      {/*</Collapse>*/}
      {/* Loading button that displays the circular throbber whenever an action is being performed */}
      <LoadingButton
        type="submit"
        disabled={submitButtonDisabled}
        loading={submitButtonLoading}
        loadingIndicator={
          <CircularProgress size={24} sx={{ color: "background.paper" }} />
        }
        fullWidth
        variant="contained"
        sx={{
          my: 3,
        }}
      >
        {action === "login" && "LOGIN"}
        {action === "register" && "REGISTER"}
        {action === "forgot" && "SEND CONFIRMATION CODE"}
      </LoadingButton>
      {/* Display the respective footer link depending on the action */}
      <Collapse in={action === "register"}>
        <Link href="/auth?action=login" passHref>
          <MUILink variant="body2" onClick={handleActionChange}>
            Already have an account? Log in!
          </MUILink>
        </Link>
      </Collapse>
      <Collapse in={action === "login" || action === "forgot"}>
        <Link href="/auth?action=register" passHref>
          <MUILink variant="body2" onClick={handleActionChange}>
            {"Don't have an account yet? Create one!"}
          </MUILink>
        </Link>
      </Collapse>
    </Box>
  );
}
