// GOAL: delete a user's note
const express = require("express");
const router = express.Router();

const verifyToken = require("../users/verifyToken");

// connect to mysql
const connection = require("../../connection");

// verify the jwt (aka. the user is logged in)
// deleting a specific note from the database
// throw errors if existing
router.delete("/deleteNote", verifyToken, async (req, res) => {

    // we need to know which user is logged in (Get their userID)
    console.log(req.userID)

    // return all of those
    connection.query(
        `DELETE FROM notes WHERE noteID = '${req.body.noteID}' AND userID = '${req.userID}';`,
        async (err, results) => {
            if (err) throw err;
            if (results.affectedRows == 0) {
                return res.status(400).json({ error : "Note deletion unsuccessful. AKA Couldn't Find Note" });
            } 
            return res.status(200).json({ message : `Note #'${req.body.noteID}' deleted.` });
    });
})

module.exports = router;