import { getConfirmPasswordErrorText } from "../../helpers/validation-strings/auth-input";

export function isEmailValid(email) {
  // We might want to refactor the length check to the caller as needed for more flexibility
  return (
    email.length === 0 || email.match(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/)
  );
}

export function isPasswordValid(password) {
  // TODO: add more complex password validation later on
  // We might want to refactor the length check to the caller as needed for more flexibility
  return password.length >= 8 || password.length === 0;
}

export function isConfirmPasswordValid(confirmPassword, password) {
  // We might want to remove this dependency on the getConfirmPasswordErrorText function
  return !getConfirmPasswordErrorText(
    confirmPassword,
    password,
    isPasswordValid(password)
  );
}
