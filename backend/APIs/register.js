const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
var mysql = require("mysql"); // import mysql module
const connection = require("../connection");

router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  /*  Email and password validation */
  //Check if email and password fields exist
  if (!email || !password) {
    return res.status(400).json({ error: "Empty field in form input." });
  }
  // Check for valid email
  if (email.length < 5 || email.length > 50 || !email.includes("@")) {
    return res.status(400).json({ error: "Invalid email address." });
  }
  // Check for valid password
  if (password.length < 6 || password.length > 40) {
    return res
      .status(400)
      .json({ error: "Password must be between 6 and 40 characters." });
  }

  let exists = [];

  // Search for account in database
  connection.query(
    `SELECT * FROM users WHERE email = '${email}';`,
    async (err, results) => {
      if (err) throw err;

      exists = await results;

      // check if account already exist
      if (exists.length != 0) {
        return res
          .status(409)
          .json({ error: "That account doesn't exist. Enter a different email." }); // 409 = conflict error code
      } else {
        bcrypt
          .hash(password, 10)
          .then(async (hash) => {
            // enter user into the database
            connection.query(
              `INSERT INTO users (email, password) VALUES ('${email}', '${hash}');`,
              (err, results) => {
                if (err) return res.status(409).json({ error: err });
                exists = results;
              }
            );
            return res.status(201).json({ message: "User created." });
          })
          .catch((error) => {
            return res.status(500).json({ error: error });
          });
      }
    }
  );
});

module.exports = router;
