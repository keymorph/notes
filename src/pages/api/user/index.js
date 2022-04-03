/*
  /api/user endpoint for account actions
*/

import userService from "../../../utils/services/user";
import validateInput from "../../../utils/middleware/validate-input";
import authenticateToken from "../../../utils/middleware/authenticate-token";

// Handle incoming requests
export default async function handler(req, res) {
  if (req.method === "GET") {
    return authenticate(req, res);
  } else if (req.method === "POST") {
    return await register(req, res);
  } else if (req.method === "PUT") {
    return await login(req, res);
  } else if (req.method === "DELETE") {
    return await remove(req, res);
  } else {
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}

/*
  User controllers
*/
function authenticate(req, res) {
  if (authenticateToken(req, res)) {
    return res.status(200).json({
      message: "Valid token",
    });
  }
}

async function register(req, res) {
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
}

async function login(req, res) {
  const { email, password } = req.body;

  try {
    validateInput.user(email, password);
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: err });
  }

  return await userService.login(email, password, res);
}

async function remove(req, res) {
  return await userService.remove(req, res);
}
