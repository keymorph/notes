import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import connection from '../models/connection.js'
import userServices from '../services/userServices.js'

// (CREATE) Create a new user.
export async function register(req, res) {
    const { email, password } = req.body

    /*  Email and password validation */
    //Check if email and password fields exist
    if (!email || !password) {
        return res.status(400).json({ error: "Empty field in form input." })
    }

    // Check for valid email
    if (email.length < 5 || email.length > 50 || !email.includes("@")) {
        return res.status(400).json({ error: "Invalid email address." })
    }

    // Check for valid password
    if (password.length < 6 || password.length > 40) {
        return res
            .status(400)
            .json({ error: "Password must be between 6 and 40 characters." })
    }
}

// (READ) Log the user in.
export async function login(req, res) {
    const { email, password } = req.body

    /*  Email and password validation */
    //Check if email and password fields exist
    if (!email || !password) {
        return res.status(400).json({ error: "Empty field in form input." })
    }

    // Check for valid email
    if (email.length < 5 || email.length > 50 || !email.includes("@")) {
        return res.status(400).json({ error: "The email address or password you entered is invalid. Please try again." })
    }

    // Check for valid password
    if (password.length < 6 || password.length > 40) {
        return res.status(400).json({ error: "The email address or password you entered is invalid. Please try again." })
    }

    let exists = []

    connection.query(
        `SELECT * FROM users WHERE email = '${email}'`,
        async (err, results) => {
            if (err) throw err

            exists = await results
            console.log(exists)
            if (exists.length == 0) {
                return res.status(401).json({ error: "This JotFox account doesn't exist. Try a different Email." })
            } else {
                console.log(exists[0].password)
                const validPassword = await bcrypt.compare(password, exists[0].password)
                console.log(validPassword)
                if (!validPassword) {
                    return res.status(400).json({ error: "The email address or password you entered is invalid. Please try again." })
                }

                const accessToken = jwt.sign(exists[0].userID, process.env.AUTH_TOKEN_SECRET)
                console.log("AccessToken")
                console.log(accessToken)
                res.status(200).json({ accessToken: accessToken })
            }
        }
    )
}

// (UPDATE) Edit the user's account details.

// (DELETE) Delete the user's notes and account.
export async function deleteUser(req, res) {
    connection.query(
        `DELETE FROM users WHERE userID = '${req.userID}'`,
        async (err, results) => {
            if (err) throw err
            if (results.affectedRows == 0) {
                return res.status(400).json({ error : "User Account deletion unsuccessful. AKA Couldn't Find User" })
            } 
            connection.query(
                `DELETE FROM notes WHERE userID = '${req.userID}'`,
                async (err, results) => {
                    if (err) throw err
                    if (results.affectedRows == 0) {
                        return res.status(400).json({ error : "Note deletion unsuccessful. AKA Couldn't Find Note(s)." })
                    } 
                    return res.status(200).json({ message : `Account & Notes deleted.` })
            })
    })
}