import uniqWith from "lodash/uniqWith.js";

import { notes } from "../models/database.js";

// TODO: Make sure that the front end sends a category object with category name and color like so:
// {
//   category_name: "Chicken",
//   color: "Yellow"
// }
const createNote = async (req, res) => {
  // Get the note resource object
  const note = notes
    .item(req.userID, req.userID)
    .read()
    .catch((err) => {
      console.error(err);
      return res.status(200).json({
        message: "Database error while creating note",
      });
    }).resource;

  // Note object to be created
  const noteDef = {
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    tags: req.body.tags,
    created_at: Math.round(Date.now() / 1000), // Seconds since Unix epoch
  };

  let notesObjArr;
  let categoriesObjArr;
  let tagsArr;
  // If the user has a note resource already, add the new note to it. Otherwise, create a new note resource.
  if (note) {
    notesObjArr = note.notes.concat(noteDef);
    // If the category/tags of the note to be created is/are already in the categories/tags array, remove it since it is a duplicate
    categoriesObjArr = uniqWith(
      note.categories.concat(req.body.category),
      (a, b) => a.category_name.toLowerCase() === b.category_name.toLowerCase() // Case insensitive comparison
    );
    tagsArr = uniqWith(
      note.tags.concat(req.body.tags),
      (a, b) => a.toLowerCase() === b.toLowerCase()
    );
  } else {
    notesObjArr = [noteDef];
    categoriesObjArr = [req.body.category];
    tagsArr = [req.body.tags];
  }

  // Clear any undefined values from the categories/tags arrays in case the user didn't send any tags or categories
  categoriesObjArr = categoriesObjArr.filter(
    (category) => category !== undefined
  );
  tagsArr = tagsArr.filter((tag) => tag !== undefined);

  // Note Item object with the noteDef object pushed to the notes array
  const noteItemDef = {
    id: req.body.userID, // The user ID is the same as the note object ID allowing for a 1:1 relationship
    notes: notesObjArr,
    categories: categoriesObjArr,
    tags: tagsArr,
    created_at: Math.round(Date.now() / 1000), // Seconds since Unix epoch
  };

  notes.items
    .upsert(noteItemDef)
    .then(({ resource }) => {
      res.status(201).json({
        message: "Note created successfully",
        noteObj: resource.notes[resource.notes.length - 1],
      });
    })
    .catch((err) => {
      console.error(err.message);
      return res.status(500).json({
        message: "Database error while creating note",
      });
    });
};

const getNoteItem = (req, res) => {
  notes
    .item(req.body.userID, req.body.userID)
    .read()
    .then(({ resource }) => {
      res.status(200).json({
        message: "Note retrieved successfully",
        noteObj: resource,
      });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({
        message: "Database error while retrieving note",
      });
    });
};

//   `SELECT * FROM notes WHERE userID = '${req.userID}';`,
//   async (err, results) => {
//     if (err) throw err;
//     return res.status(200).json({
//       categories: req.categories,
//       notes: results,
//     });
//   }
// );

const editNote = (req, res) => {
  notes
    .item(req.body.userID, req.body.userID)
    .update({
      notes: req.body.notes,
      categories: req.body.categories,
      tags: req.body.tags,
    })
    .then(({ resource }) => {
      res.status(200).json({
        message: "Note updated successfully",
        noteObj: resource,
      });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({
        message: "Database error while updating note",
      });
    });

  //   .query(
  //   `UPDATE notes SET title = '${req.body.title}', description = '${req.body.description}', categoryID = '${req.body.categorID}', tags = '${req.body.tags}' WHERE noteID = '${req.body.noteID}' AND userID = '${req.userID}';`,
  //   async (err, results) => {
  //     if (err) throw err;
  //     if (results.affectedRows === 0) {
  //       return res
  //         .status(400)
  //         .json({ error: `Note update unsuccessful; couldn't find note.` });
  //     }
  //     return res
  //       .status(200)
  //       .json({ message: `Note #'${req.body.noteID}' update.`, ...results });
  //   }
  // );
};

const removeNote = (req, res) => {
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

const noteService = {
  create: createNote,
  show: getNoteItem,
  edit: editNote,
  remove: removeNote,
};
export default noteService;
