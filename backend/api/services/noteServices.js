const connection = require("../models/connection");

exports.create = (req, res) => {
    connection.query(
        `INSERT INTO notes (title, description, category, tags, userID) VALUES ('${req.body.title}', '${req.body.description}', '${req.body.category}', '${req.body.tags}', '${req.userID}');`, 
        async (err, results) => {
            if (err) throw err;
            return res.status(200).json({ message: req.userID });
    });
}

exports.show = (req, res) => {
    connection.query(
        `SELECT * FROM notes WHERE userID = '${req.userID}';`,
        async (err, results) => {
            if (err) throw err;
            console.log(results);
            return res.status(200).json(results);
    });
}

exports.edit = (req, res) => {
    connection.query(
        `UPDATE notes SET title = '${req.body.title}', description = '${req.body.description}', category = '${req.body.category}', tags = '${req.body.tags}' WHERE noteID = '${req.body.noteID}' AND userID = '${req.userID}';`,
        async (err, results) => {
            if (err) throw err;
            if (results.affectedRows == 0) {
                return res.status(400).json({ error : "Note update unsuccessful. AKA Couldn't Find Note" });
            } 
            return res.status(200).json({ message : `Note #'${req.body.noteID}' update.`, ...results });
    });
}

exports.delete = (req, res) => {
    connection.query(
        `DELETE FROM notes WHERE noteID = '${req.body.noteID}' AND userID = '${req.userID}';`,
        async (err, results) => {
            if (err) throw err;
            if (results.affectedRows == 0) {
                return res.status(400).json({ error : "Note deletion unsuccessful. AKA Couldn't Find Note" });
            } 
            return res.status(200).json({ message : `Note #'${req.body.noteID}' deleted.` });
    });
}