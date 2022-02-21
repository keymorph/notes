import { notes, users } from "../models/database.js";

const create = (req, res) => {
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

  const noteDef = {
    title: req.body.title,
    content: req.body.content,
    description: req.body.description,
    category: req.body.category,
    created_at: Math.round(Date.now() / 1000), // Seconds since Unix epoch
  };

  const noteItemDef = {
    id: user.id,
    notes: note?.notes.push(noteDef) || [noteDef], // Push note if note resource exists otherwise create a new note array
    categories: note?.categories.push(req.body.category) || [req.body.category],
    tags: note?.tags.push(req.body.tags) || [req.body.tags],
    created_at: Math.round(Date.now() / 1000), // Seconds since Unix epoch
  };

  // If note item is found, update it with the new note data
  if (note) {
    notes
      .item(req.userID, req.userID)
      .replace(noteItemDef)
      .then((r) => {
        res.status(201).json({
          message: "Note created successfully",
          note: r.resource.notes[r.resource.notes.length - 1],
        });
      })
      .catch((err) => {
        console.error(err);
        return res.status(500).json({
          message: "Database error while creating note",
        });
      });
  } else {
    notes.items.create(noteItemDef).then((r) => {
      res
        .status(201)
        .json({
          message: "Note created successfully",
          note: r.resource.notes[0],
        })
        .catch((err) => {
          console.error(err);
          return res.status(500).json({
            message: "Database error while creating note",
          });
        });
    });
  }
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
