// GOAL: delete a user from the database.
// We need to delete a user and remove their session key.
// delete their notes
const express = require("express");
const router = express.Router();

const verifyToken = require("./verifyToken");

// connect to mysql
const connection = require("../../connection");

// verify the jwt (aka. the user is logged in)
// deleting the user from the database, (remove header auth-token on front-end side), delete user's notes from "notes" table
// throw errors if existing
router.delete("/deleteUser", verifyToken, async (req, res) => {

    // we need to know which user is logged in (Get their userID)
    console.log(req.userID)

    // delete user
    connection.query(
        `DELETE FROM users WHERE userID = '${req.userID}';`,
        async (err, results) => {
            if (err) throw err;
            if (results.affectedRows == 0) {
                return res.status(400).json({ error : "User Account deletion unsuccessful. AKA Couldn't Find User" });
            } 
            // delete that users' notes
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
})

module.exports = router;