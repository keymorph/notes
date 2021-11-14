const express = require("express");
const router = express.Router();
var mysql = require("mysql");
const connection = require("../connection");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    /*  Email and password validation */
    //Check if email and password fields exist
    if (!email || !password) {
      return res.status(400).json({ error: "Empty field in form input." });
    }

    // Check for valid email
    if (email.length < 5 || email.length > 50 || !email.includes("@")) {
      return res.status(400).json({ error: "The email address or password you entered is invalid. Please try again." });
    }

    // Check for valid password
    if (password.length < 6 || password.length > 40) {
        return res.status(400).json({ error: "The email address or password you entered is invalid. Please try again." });
    }

    let exists = [];

    connection.query(
        `SELECT * FROM users WHERE email = '${email}';`,
        async (err, results) => {
            if (err) throw err;
    
            exists = await results;
            console.log(exists)
            if (exists.length == 0) {
                return res.status(401).json({ error: "This JotFox accout doesn't exist. Try a different Email." });
            } else {
                console.log(exists[0].password)
                const validPassword = await bcrypt.compare(password, exists[0].password);
                console.log(validPassword)
                if (!validPassword) {
                    return res.status(400).json({ error: "The email address or password you entered is invalid. Please try again." });
                }

                const accessToken = jwt.sign(exists[0].userID, process.env.AUTH_TOKEN_SECRET);
                console.log("AccessToken")
                console.log(accessToken)
                res.status(200).json({ accessToken: accessToken });
            }
        }
    );
});

module.exports = router;
