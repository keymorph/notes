import jwt from "jsonwebtoken";
import { users } from "../models/database.js";

export default function authenticateToken(req, res) {
  const token = req.headers["auth-token"];
  let userID;

  if (token == null) {
    return res.status(403).json({ error: "Token not found" });
  }

  jwt.verify(token, process.env.AUTH_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      res.status(403).json({ error: "Invalid token" });
    } else {
      if (userExists(req, res, decoded.userID)) {
        userID = decoded.userID;
      }
    }
  });

  req.headers.userID = userID;
  return userID;
}

// Check if user exists
async function userExists(req, res, userID) {
  users
    .item(userID, userID)
    .read()
    .then(({ resource }) => {
      if (!resource) {
        console.log("User not found");
        res.status(403).json({ error: "User not found" });
        return false;
      } else {
        return true;
      }
    })
    .catch((error) => {
      console.log(error);
      res
        .status(500)
        .json({ error: "Database error while verifying the JWT Token" });
      return false;
    });
}
