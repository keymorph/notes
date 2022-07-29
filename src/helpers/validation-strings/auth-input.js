import { isPasswordValid } from "../../utils/input-validation/validate-credentials";

export function getPasswordErrorText(password) {
  if (!isPasswordValid(password)) {
    return "Password must be at least 8 characters long.";
  }
  return "";
}

export function getConfirmPasswordErrorText(confirmPassword, password) {
  if (confirmPassword.length !== 0 && password.length !== 0) {
    if (password !== confirmPassword && isPasswordValid(password)) {
      return "Passwords do not match.";
    } else if (!isPasswordValid(password)) {
      return "Please check that your password above meets the requirements.";
    } else if (password.length === 0) {
      return "The password field above is empty.";
    } else {
      return "";
    }
  } else if (password.length === 0 && confirmPassword.length !== 0) {
    return "The password field above is empty.";
  } else {
    return "";
  }
}

// TODO: Transfer this to a model.
