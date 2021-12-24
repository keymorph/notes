const connection = require("../models/connection");
const bcrypt = require('bcrypt');

// Search for user email.
exports.search = async (email, password, res) => {
    let exists = [];
    connection.query(
        `SELECT * FROM users WHERE email = '${email}';`,
        async (err, results) => {
            console.log("ERR")
            console.log(err);
            if (err) throw err;
            
            exists = await results;
            
            if (exists.length != 0) {
                console.log("ERROR 409: An account with this email already exists.");
                return res.status(409).json({ error: "An account with this email already exists." });
            } else {
                register(email, password, res);
            }
        }
    );
}

// Create a new user account.
const register = async (email, password, res) => {
    bcrypt.hash(password, 10)
    .then(async (hash) => {
        // enter user into the database
        try {
            const result = await connection.query(`INSERT INTO users (email, password) VALUES ('${email}', '${hash}');`)
            return res.status(201).json({ message: "User created." });
        }
        catch (error) {
            return res.status(500).json({ error: "Error with MySQL connection." });
        }
    })
    .catch((error) => {
        return res.status(500).json({ error: error });
    });
}

// // Search for user email.
// exports.search = async (email) => {
//     let exists = [];
//     connection.query(
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
//             const result = await connection.query(`INSERT INTO users (email, password) VALUES ('${email}', '${hash}');`)
//             return res.status(201).json({ message: "User created." });
//         }
//         catch (error) {
//             return res.status(500).json({ error: "Error with MySQL connection." });
//         }
//     })
//     .catch((error) => {
//         return res.status(500).json({ error: error });
//     });
// }