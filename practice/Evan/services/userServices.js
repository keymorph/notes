import express from 'express'
import bcrypt from 'bcrypt'
import connection from '../models/connection.js'

// Search for user email.
const search = (email, res) => {
    let exists = [];
    console.log(`SEARCH: Before Connection.`)
    connection.query(
        `SELECT * FROM users WHERE email = '${email}';`,
        (err, res) => {
            console.log(`SEARCH: Inside ERR/RES.`)
            console.log("ERR")
            console.log(err);
            if (err) throw err;
            
            exists = res;
            console.log(exists)
            
            if (exists.length != 0) {
                console.log("ERROR 409: An account with this email already exists.");
                return false;
            } else {
                return true;
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
            const res = await connection.query(`INSERT INTO users (email, password) VALUES ('${email}', '${hash}');`)
            return res.status(201).json({ message: "User created." });
        }
        catch (error) {
            return res.status(500).json({ error: "Error with MySQL connection." });
        }
    })
    .catch((error) => {
        // return res.status(500).json({ error : error });
        console.log("ERROR?")
    });
}

export default { search, register }
console.log(module.exports)