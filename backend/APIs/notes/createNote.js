// GOAL: put a new note in the database
const express = require("express");
const router = express.Router();

const verifyToken = require("../users/verifyToken");

// connect to mysql
const connection = require("../../connection");

// verify the jwt (aka. the user is logged in)
// take users input and push to database
// throw errors if existing
router.post("/createNote", verifyToken, async (req, res) => {

    // we need to know which user is logged in (Get their userID)
    console.log(req.userID)

    // create the note based off of the user's input (Title, Desc, etc.)
    // associate the note with that userID
    connection.query(
        `INSERT INTO notes (title, description, category, tags, userID) VALUES ('${req.body.title}', '${req.body.description}', '${req.body.category}', '${req.body.tags}', '${req.userID}');`, 
        async (err, results) => {
            if (err) throw err;
    });

    return res.status(200).json({ message: req.userID });
})

module.exports = router;
