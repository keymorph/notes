/**
 * @description This function contains all the alerts strings for the auth page
 *
 * @param {string} error - The message url query string (e.g. the one passed by next-auth upon failure)
 * @returns {string} - Returns a string with the message
 */
export default function getAuthAlertText(message) {
  switch (message) {
    // Wrong credentials error
    case "CredentialsSignin":
      return "Email or password is incorrect.";
    // Registration success
    case "RegisterSuccess":
      return "Registration Successful 🥳!\nPlease sign in with your credentials below.";
    case "EmailTaken":
      return "Email already registered.";
    // Other errors
    default:
      return message;
  }
}
