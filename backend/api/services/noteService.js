import { notes, users } from "../models/database.js";

const create = async (req, res) => {
  // Get the user resource object
  const user = users
    .item(req.userID, req.userID)
    .read()
    .catch((err) => {
      console.log(err);
      return res.status(200).json({
        message: "Database error while creating note",
      });
    }).resource;
  // Get the note resource object
  const note = notes
    .item(req.userID, req.userID)
    .read()
    .catch((err) => {
      console.log(err);
      return res.status(200).json({
        message: "Database error while creating note",
      });
    }).resource;

  // Definitions for the note to be created
  const noteDef = {
    title: req.body.title,
    content: req.body.content,
    description: req.body.description,
    category: req.body.category,
    created_at: Math.round(Date.now() / 1000), // Seconds since Unix epoch
  };

  const noteItemDef = {
    id: user.id, // The user ID is the same as the note object ID. This allows for a 1:1 relationship between user and note item
    notes: note?.notes.push(noteDef) || [noteDef], // Push note if note resource exists otherwise create a new note array
    categories: note?.categories.push(req.body.category) || [req.body.category], // Push category if note resource exists otherwise create a new category array
    tags: note?.tags.push(req.body.tags) || [req.body.tags], // Push tags if note resource exists otherwise create a new tags array
    created_at: Math.round(Date.now() / 1000), // Seconds since Unix epoch
  };

  notes.items
    .upsert(noteItemDef)
    .then(({ resource }) => {
      res.status(201).json({
        message: "Note created successfully",
        note: resource.notes[resource.notes.length - 1],
      });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({
        message: "Database error while creating note",
      });
    });
  //     `INSERT INTO notes (title, description, categoryID, tags, userID) VALUES ('${req.body.title}', '${req.body.description}', '${req.categoryID}', '${req.body.tags}', '${req.userID}');`,
  //     async (err, results) => {
  //         if (err) throw err
  //         return res.status(200).json(
  //             {
  //                 'noteID': `${results.insertId}`,
  //                 ...req.body
  //             }
  //         )
  // })
};

const show = (req, res) => {
  notes.items.query(
    `SELECT * FROM notes WHERE userID = '${req.userID}';`,
    async (err, results) => {
      if (err) throw err;
      return res.status(200).json({
        categories: req.categories,
        notes: results,
      });
    }
  );
};

const edit = (req, res) => {
  notes.items.query(
    `UPDATE notes SET title = '${req.body.title}', description = '${req.body.description}', categoryID = '${req.body.categorID}', tags = '${req.body.tags}' WHERE noteID = '${req.body.noteID}' AND userID = '${req.userID}';`,
    async (err, results) => {
      if (err) throw err;
      if (results.affectedRows === 0) {
        return res
          .status(400)
          .json({ error: `Note update unsuccessful; couldn't find note.` });
      }
      return res
        .status(200)
        .json({ message: `Note #'${req.body.noteID}' update.`, ...results });
    }
  );
};

const remove = (req, res) => {
  console.log("OUTSIDE");
  database.query(
    `DELETE FROM notes WHERE noteID = '${req.body.noteID}' AND userID = '${req.userID}';`,
    async (err, results) => {
      console.log("INSIDE");
      if (err) throw err;
      if (results.affectedRows === 0) {
        return res.status(400).json({ error: `Note not found.` });
      }
      return res
        .status(200)
        .json({ message: `Note #'${req.body.noteID}' deleted.`, ...results });
    }
  );
};

const noteService = { create, show, edit, remove };
export default noteService;
