// GOAL: edit a user's note.
const express = require("express");
const router = express.Router();

const verifyToken = require("../users/verifyToken");

// connect to mysql
const connection = require("../../connection");

// verify the jwt (aka. the user is logged in)
// take users input, override/push to (existing note in) database
// throw errors if existing
router.put("/editNote", verifyToken, async (req, res) => {

    // we need to know which user is logged in (Get their userID)
    console.log(req.userID)

    // return all of those
    connection.query(
        `UPDATE notes SET title = '${req.body.title}', description = '${req.body.description}', category = '${req.body.category}', tags = '${req.body.tags}' WHERE noteID = '${req.body.noteID}' AND userID = '${req.userID}';`,
        async (err, results) => {
            if (err) throw err;
            if (results.affectedRows == 0) {
                return res.status(400).json({ error : "Note update unsuccessful. AKA Couldn't Find Note" });
            } 
            return res.status(200).json({ message : `Note #'${req.body.noteID}' update.`, ...results });
    });
})

module.exports = router;