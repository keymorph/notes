/*
  /api/user endpoint for account actions
*/

import userService from "../../../api/services/user";
import {
  isEmailValid,
  isPasswordValid,
} from "../../../utils/input-validation/validate-credentials";

// Handle incoming requests
export default async function handler(req, res) {
  if (req.method === "POST") {
    return await login(req, res);
  } else if (req.method === "PUT") {
    return await register(req, res);
  } else if (req.method === "DELETE") {
    return await remove(req, res);
  } else {
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}

/*
  User controllers
*/
async function register(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Empty field/s in form input." });
  } else if (!isPasswordValid(password)) {
    return res.status(400).json({ error: "Invalid password in form input." });
  } else if (!isEmailValid(email)) {
    return res.status(400).json({ error: "Invalid email in form input." });
  }

  return await userService.register(email, password, res);
}

async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Empty field/s in form input." });
  }

  return await userService.login(email, password, res);
}

async function remove(req, res) {
  return await userService.remove(req, res);
}
