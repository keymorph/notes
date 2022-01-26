import database from '../models/database.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const search = async (email, res) => {
    let emailExists = []
    return new Promise((resolve, reject) => {

        database.query(
            `SELECT * FROM users WHERE email = '${email}';`,
            async (err, results) => {
                if (err) throw err
                emailExists = await results
                
                if (emailExists.length != 0) {
                    reject(false)
                } else {
                    resolve(true)
                }
            }
        )

    })
}

const register = async (email, password, res) => {
    bcrypt.hash(password, 10)
    .then(async (hash) => {
        try {
            database.query(`INSERT INTO users (email, password) VALUES ('${email}', '${hash}');`)
            return res.status(201).json({ message: 'User created.' })
        }
        catch (error) {
            return res.status(500).json({ error: 'Error with MySQL database.' })
        }
    })
    .catch((error) => {
        return res.status(500).json({ error: error })
    })
}

const login = async (email, password, res) => {
    let exists = []
    database.query(
        `SELECT * FROM users WHERE email = '${email}';`,
        async (err, results) => {
            if (err) throw err
            exists = await results

            if (exists.length == 0) {
                console.log("Account doesn't exist.")
                return res.status(401).json({ error: `This JotFox account doesn't exist. Try a different Email.` })
            } else {
                const validPassword = await bcrypt.compare(password, exists[0].password)

                if (!validPassword) {
                    console.log("Incorrect password.")
                    return res.status(400).json({ error: 'The email address or password you entered is invalid. Please try again.' })
                }

                console.log("All good, here's a JWT.")
                const accessToken = jwt.sign(exists[0].userID, process.env.AUTH_TOKEN_SECRET)
                res.status(200).json({ accessToken: accessToken })
            }
        }
    )
}

const remove = async (req, res) => {
    database.query(
        `DELETE FROM users WHERE userID = '${req.userID}';`,
        async (err, results) => {
            if (err) throw err
            if (results.affectedRows == 0) {
                return res.status(400).json({ error : `User Account deletion unsuccessful. AKA Couldn't Find User` })
            } 
            database.query(
                `DELETE FROM notes WHERE userID = '${req.userID}';`,
                async (err, results) => {
                    if (err) throw err
                    if (results.affectedRows == 0) {
                        return res.status(400).json({ error : `Note deletion unsuccessful. AKA Couldn't Find Note(s).` })
                    } 
                    return res.status(200).json({ message : `Account & Notes deleted.` })
            })
    })
}

const userService = { search, register, login, remove }
export default userService

// const search = async (email, password, res) => {
//     let exists = []
//     database.query(
//         `SELECT * FROM users WHERE email = '${email}';`,
//         async (err, results) => {
//             console.log("ERR")
//             console.log(err)
//             if (err) throw err
            
//             exists = await results
            
//             if (exists.length != 0) {
//                 console.log("ERROR 409: An account with this email already exists.")
//                 return res.status(409).json({ error: "An account with this email already exists." })
//             } else {
//                 register(email, password, res)
//             }
//         }
//     );
// }

// export const register = async (email, password, res) => {
//     bcrypt.hash(password, 10)
//     .then(async (hash) => {
//         try {
//             const result = await database.query(`INSERT INTO users (email, password) VALUES ('${email}', '${hash}');`)
//             return res.status(201).json({ message: "User created." })
//         }
//         catch (error) {
//             return res.status(500).json({ error: "Error with MySQL database." })
//         }
//     })
//     .catch((error) => {
//         return res.status(500).json({ error: error })
//     })
// }

// export userService

// // Search for user email.
// exports.search = async (email) => {
//     let exists = [];
//     database.query(
//         `SELECT * FROM users WHERE email = '${email}';`,
//         async (err, results) => {
//             console.log("ERR")
//             console.log(err);
//             if (err) throw err;
            
//             exists = await results;
            
//             if (exists.length != 0) {
//                 console.log("ERROR 409: An account with this email already exists.");
//                 return false;
//             } else {
//                 return true;
//             }
//         }
//     );
// }

// // Create a new user account.
// exports.register = async (email, password, res) => {
//     bcrypt.hash(password, 10)
//     .then(async (hash) => {
//         // enter user into the database
//         try {
//             const result = await database.query(`INSERT INTO users (email, password) VALUES ('${email}', '${hash}');`)
//             return res.status(201).json({ message: "User created." });
//         }
//         catch (error) {
//             return res.status(500).json({ error: "Error with MySQL database." });
//         }
//     })
//     .catch((error) => {
//         return res.status(500).json({ error: error });
//     });
// }