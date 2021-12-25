import { response } from 'express'
import jwt from 'jsonwebtoken'
import connection from '../models/connection.js'

export default function verifyToken(req, res, next) {
  const token = req.headers['auth-token'];

  if (token == null) {
    return res.status(403).json({ error: "Session Token not found." });
  }

  jwt.verify(token, process.env.AUTH_TOKEN_SECRET, (err, userID) => {
    console.log("ENTERED VERIFY");
    if (err) {
      return res.status(403).json({ error: "Invalid Session Token." });
    }

    // Search the database for the user associated with the token, and see if it exists
    connection.query(
      `SELECT * FROM users WHERE userID = '${userID}';`,
      async (err, results) => {
        console.log("ENTERED ASYNC");
        if (results.length == 0) {
          return res.status(403).json({ error: "User not found." });
        }

        console.log(results);
        req.userID = userID;
        console.log("BEFORE NEXT");
        next();
    });
  });
}