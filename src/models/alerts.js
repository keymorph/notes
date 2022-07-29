/**
 * Object containing alert descriptions based on the type.
 *
 * @type {{RegisterSuccess: string, CredentialsSignin: string, EmailTaken: string}}
 */
export const ALERTS = {
  CredentialsSignin: "Email or password is incorrect.",
  RegisterSuccess:
    "Registration Successful 🥳!\nPlease sign in with your credentials below.",
  EmailTaken: "Email already registered.",
};

/**
 *  Returns an alert description string based on the passed type. If no alert matching type is found, the type is returned.
 *
 *  @param {string} type - The alert type
 *  @returns {string} The alert description text
 */
export function getAlertDescription(type) {
  if (!ALERTS[type]) {
    return type;
  }
  return ALERTS[type];
}
