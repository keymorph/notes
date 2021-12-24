const connection = require('../models/connection');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userServices = require('../services/userServices');

// (CREATE) Create a new user.
exports.register = async (req, res) => {
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

    userServices.search(email, password, res);

    // const value = async () => {
    //     const result = await userServices.search(email)

    //     if (result) {
    //         userServices.register(email, password, res)
    //     }
    // }

    // if (exists) {
    //     userServices.register(email, password, res);
    // } else {
    //     console.log("ELSE STATEMENT");
    //     return res.status(409).json({ error: "Email already exists." });
    // }

    // // // Check if the user email exists.
    // if (await userServices.search(email)) {
    //     // Register a new user with the email.
    //     userServices.register(email, password, res);
    // } else {
    //     console.log("ELSE STATEMENT");
    //     return res.status(409).json({ error: "Email already exists." });
    // }

    // connection.query(
    //     `SELECT * FROM users WHERE email = '${email}';`,
    //     async (err, results) => {
    //         if (err) throw err;

    //         exists = await results;

    //         // check if account already exist
    //         if (exists.length != 0) {
    //             return res
    //                 .status(409)
    //                 .json({ error: "An account with this email already exists." }); // 409 = conflict error code
    //         } else {
    //             bcrypt
    //                 .hash(password, 10)
    //                 .then(async (hash) => {
    //                     // enter user into the database
    //                     connection.query(
    //                         `INSERT INTO users (email, password) VALUES ('${email}', '${hash}');`,
    //                         (err, results) => {
    //                             if (err) return res.status(409).json({ error: err });
    //                             exists = results;
    //                         }
    //                     );
    //                     return res.status(201).json({ message: "User created." });
    //                 })
    //                 .catch((error) => {
    //                     return res.status(500).json({ error: error });
    //                 });
    //         }
    //     }
    // );
};

// (READ) Log the user in.
exports.login = async (req, res) => {
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
                return res.status(401).json({ error: "This JotFox account doesn't exist. Try a different Email." });
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
}

// (UPDATE) Edit the user's account details.

// (DELETE) Delete the user's notes and account.
exports.delete = async (req, res) => {
    connection.query(
        `DELETE FROM users WHERE userID = '${req.userID}';`,
        async (err, results) => {
            if (err) throw err;
            if (results.affectedRows == 0) {
                return res.status(400).json({ error : "User Account deletion unsuccessful. AKA Couldn't Find User" });
            } 
            connection.query(
                `DELETE FROM notes WHERE userID = '${req.userID}';`,
                async (err, results) => {
                    if (err) throw err;
                    if (results.affectedRows == 0) {
                        return res.status(400).json({ error : "Note deletion unsuccessful. AKA Couldn't Find Note(s)." });
                    } 
                    return res.status(200).json({ message : `Account & Notes deleted.` });
            });
    });
}