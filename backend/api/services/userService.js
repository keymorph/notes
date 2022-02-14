import { users } from '../models/database.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const register = async (email, password, res) => {
    // Check if the email already exists in the database
    if (users.item(email, 'id').id === email)
        return res.status(409).send( 'This email already belongs to an account');

    const salt = bcrypt.genSalt(10); // Generate salt with specified number of rounds (cost)
    bcrypt.hash(password, salt, function(err, hash) {
        if (!err)
            users.items.create({
                id: email,
                password: hash
            }).then(() => {
                return res.status(201).json({ message: 'User created 🪄' })
            }).catch((err) => {
                return res.status(500).json({ error: `Database error while registering user ${email}:\n${err}` })
            })
        else
            return res.status(500).json({ error: `Error while hashing password: ${err}` })
    });
}

const login = async (email, password, res) => {
    users.items.query(
        `SELECT * FROM users WHERE email = '${email}';`
    ).fetchNext().then((results) => {
            if (results.length === 0) {
                console.log("Account doesn't exist.")
                return res.status(401).json({error: `This JotFox account doesn't exist. Try a different Email.`})
            } else {
                const validPassword = bcrypt.compare(password, results[0].password)

                if (!validPassword) {
                    console.log("Incorrect password.")
                    return res.status(400).json({error: 'The email address or password you entered is invalid. Please try again.'})
                }

                console.log("All good, here's a JWT.")
                const accessToken = jwt.sign(results[0].userID, process.env.AUTH_TOKEN_SECRET)
                res.status(200).json({accessToken: accessToken})
            }
        }
    ).catch((error) => {
            throw error;
    })
}

const remove = async (req, res) => {
    users.query(
        `DELETE FROM users WHERE userID = '${req.userID}';`,
        async (err, results) => {
            if (err) throw err
            if (results.affectedRows === 0) {
                return res.status(400).json({ error : `User Account deletion unsuccessful. AKA Couldn't Find User` })
            }
            users.query(
                `DELETE FROM notes WHERE userID = '${req.userID}';`,
                async (err, results) => {
                    if (err) throw err
                    if (results.affectedRows === 0) {
                        return res.status(400).json({ error : `Note deletion unsuccessful. AKA Couldn't Find Note(s).` })
                    }
                    return res.status(200).json({ message : `Account & Notes deleted.` })
            })
    })
}

const userService = { register, login, remove }
export default userService
