import validateInput from "../middleware/validateInput.js";
import userService from "../services/userService.js";

// Hey... Give me a email, and a password
// Information to Register
// ----
// 1. Validate the Input (make sure it's even an email address to begin with)
// 2. I'm going to search the database for that email
// If that email exists then reject.

const register = async (req, res) => {
  console.log("-----------------\nREGISTER USER API");
  const { email, password } = req.body;

  // Ensure the email and password are valid before continuing
  try {
    validateInput.user(email, password);
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: err });
  }

  return await userService.register(email, password, res);
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    validateInput.user(email, password);
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: err });
  }

  return await userService.login(email, password, res);
};

const remove = async (req, res) => {
  await userService.remove(req, res);
};

const userController = { register, login, remove };
export default userController;
