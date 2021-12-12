// GOAL: show all of the users' notes (for the Dashboard)
const express = require("express");
const router = express.Router();

const verifyToken = require("../users/verifyToken");

// connect to mysql
const connection = require("../../connection");

// verify the jwt (aka. the user is logged in)
// reading all of the notes shown in the database associated with the current user
// throw errors if existing
router.get("/showNotes", verifyToken, async (req, res) => {

    // we need to know which user is logged in (Get their userID)
    console.log(req.userID)

    // search notes table for notes with the current userID value
    // return all of those
    connection.query(
        `SELECT * FROM notes WHERE userID = '${req.userID}';`,
        async (err, results) => {
            if (err) throw err;
            console.log(results);
            return res.status(200).json(results);
    });
})

module.exports = router;