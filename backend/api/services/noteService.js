import database from '../models/database.js'

const create = (req, res) => {
    database.query(
        `INSERT INTO notes (title, description, categoryID, tags, userID) VALUES ('${req.body.title}', '${req.body.description}', '${req.categoryID}', '${req.body.tags}', '${req.userID}');`, 
        async (err, results) => {
            if (err) throw err
            return res.status(200).json(
                {
                    'noteID': `${results.insertId}`,
                    ...req.body
                }
            )
    })
}

const show = (req, res) => {
    database.query(
        `SELECT * FROM notes WHERE userID = '${req.userID}';`,
        async (err, results) => {
            if (err) throw err
            return (res.status(200).json( {
                "categories": req.categories,
                "notes": results
            }))
    })
}

const edit = (req, res) => {
    database.query(
        `UPDATE notes SET title = '${req.body.title}', description = '${req.body.description}', categoryID = '${req.body.categorIDy}', tags = '${req.body.tags}' WHERE noteID = '${req.body.noteID}' AND userID = '${req.userID}';`,
        async (err, results) => {
            if (err) throw err
            if (results.affectedRows == 0) {
                return res
                    .status(400)
                    .json({ error : `Note update unsuccessful; couldn't find note.` })
            } 
            return res
                .status(200)
                .json({ message : `Note #'${req.body.noteID}' update.`, ...results })
    });
}

const remove = (req, res) => {
    console.log("OUTSIDE")
    database.query(
        `DELETE FROM notes WHERE noteID = '${req.body.noteID}' AND userID = '${req.userID}';`,
        async (err, results) => {
            console.log("INSIDE")
            if (err) throw err
            if (results.affectedRows == 0) {
                return res
                    .status(400)
                    .json({ error : `Note not found.` })
            } 
            return res
                .status(200)
                .json({ message : `Note #'${req.body.noteID}' deleted.`, ...results })
    })
}

const noteService = { create, show, edit, remove }
export default noteService