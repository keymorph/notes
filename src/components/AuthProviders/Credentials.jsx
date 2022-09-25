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
import { useSnackbar } from "notistack";
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

export default function Credentials({ action, isUnauthenticated }) {
  //#region Hooks

  const router = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  // Input data state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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

  //#endregion

  //#region Handlers

  // Ensure that password and other states are handled between action changes
  const handleActionChange = () => {
    setConfirmPassword("");
    setConfirmPasswordValid(true);
    setConfirmPasswordError("");
    setSubmitButtonLoading(false);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    const data = {
      email: email,
      password: password,
      redirect: false,
    };

    setSubmitButtonLoading(true);
    await signIn("credentials", data)
      .then(({ error }) => {
        if (error) {
          if (error === "CredentialsSignin") {
            enqueueSnackbar("Email or password is incorrect", {
              variant: "error",
            });
          } else {
            throw error;
          }
        }
      })
      .catch((error) => {
        console.error(error.message);
        enqueueSnackbar("An error occurred while signing in", {
          variant: "error",
        });
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
        await router.push("/auth?action=login");
        enqueueSnackbar("You were successfully registered 🎉", {
          variant: "success",
        });
      })
      .catch((error) => {
        const status = error.response?.status;
        // If an error is thrown, append it as a query param to the url
        if (status === 409) {
          enqueueSnackbar("An account with this email already exists", {
            variant: "error",
          });
        } else {
          enqueueSnackbar("An error occurred while registering", {
            variant: "error",
          });
        }
      });
    handleActionChange();
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

  //#endregion

  const submitButtonDisabled =
    !email ||
    !emailValid ||
    !password ||
    !passwordValid ||
    (action === "register" && !confirmPassword) ||
    !confirmPasswordValid ||
    !isUnauthenticated;

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
          autoComplete={action === "login" ? "current-password" : "new-password"}
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
          autoComplete={"new-password"}
          label="Confirm Password"
          name="password"
          type="password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          margin="normal"
          fullWidth
        />
      </Collapse>
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
