import uniqWith from "lodash/uniqWith.js";

import { notes } from "../models/database.js";
import note from "../routes/note.js";

// TODO: Make sure that the front end sends a category object with category name and color like so:
// {
//   category_name: "Chicken",
//   color: "Yellow"
// }
const createNote = async (req, res) => {
  // Get the note resource object
  const { resource: noteItem } = notes
    .item(req.userID, req.userID)
    .read()
    .catch((err) => {
      console.error(err);
      return res.status(200).json({
        message: "Database error while creating note",
      });
    });

  // Note object to be created
  const noteDef = {
    title: req.body.title,
    description: req.body.description,
    category: req.body.category.name, // The category the note belongs to
    tags: req.body.tags, // The tags the note has
    id: noteItem?.last_note_id + 1 || 1, // Set note_id to the last note's id number + 1
    created_at: Math.round(Date.now() / 1000), // Seconds since Unix epoch
  };

  let notesObjArr, categoriesObjArr, tagsArr;
  // If the user has a note resource already, add the new note to it. Otherwise, create a new note resource.
  if (noteItem) {
    notesObjArr = noteItem.notes.concat(noteDef);
    // If the category/tags of the note to be created is/are already in the categories/tags array, remove it since it is a duplicate
    categoriesObjArr = uniqWith(
      noteItem.categories.concat(req.body.category),
      (a, b) => a.name.toLowerCase() === b.name.toLowerCase() // Case-insensitive comparison of category names
    );
    tagsArr = uniqWith(
      noteItem.tags.concat(req.body.tags),
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
    id: req.body.userID, // The user ID is the same as the note item ID allowing for a 1:1 relationship
    notes: notesObjArr,
    categories: categoriesObjArr,
    tags: tagsArr,
    last_note_id: noteDef.id,
    created_at: Math.round(Date.now() / 1000), // Seconds since Unix epoch
  };

  notes.items
    .upsert(noteItemDef)
    .then(({ resource: noteItem }) => {
      res.status(201).json({
        message: "Note created successfully",
        note: noteItem.notes[noteItem.notes.length - 1],
      });
    })
    .catch((err) => {
      console.error(err.message);
      return res.status(500).json({
        message: "Database error while creating note",
      });
    });
};

const getNoteItem = async (req, res) => {
  notes
    .item(req.body.userID, req.body.userID)
    .read()
    .then(({ resource: noteItem }) => {
      res.status(200).json({
        message: "Note retrieved successfully",
        noteItem,
      });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({
        message: "Database error while retrieving note",
      });
    });
};

// The important questions:
// 1. Do I expect to get all the notes from the front end and just send them to the database?
// 2a. Check for case when the category is edited to a new category name and that category needs to be created
// 2b. Check for case  when the tags are edited to a new tag and that tag needs to be created
// 3a. Check for case when the category is removed and needs to be deleted if its the only note in the category
// 3b. Check for case when the tags are removed and needs to be deleted if its the only note with the tag
// 4a. Check for case when the category is changed to an existing category
// 4b. Check for case when the tags are changed to an existing tag
// 5. Should I patch the existing data using the patch api or just replace everything?
const editNote = async (req, res) => {
  // Get the note resource object
  const { resource: noteItem } = notes
    .item(req.userID, req.userID)
    .read()
    .catch((err) => {
      console.error(err);
      return res.status(200).json({
        message: "Database error while creating note",
      });
    });

  // Get the note to be edited
  const noteIdx = noteItem.notes.findIndex(
    (note) => note.id === req.body.noteID
  );
  const noteToEdit = noteItem.notes[noteIdx];

  // Check if the categories and/or tags have changed
  // Update their respective global array if they have
  if (
    req.body.category !== noteToEdit.category ||
    req.body.tags !== noteToEdit.tags
  ) {
    // Track the category and tag status and if they are new or existing
    let [onlyNoteWithCategory, categoryIsNew] = [true, true];
    let [tagsToRemove, tagsToAdd] = [noteToEdit.tags, req.body.tags];

    noteItem.notes.forEach((note) => {
      if (note.id !== noteToEdit.id) {
        // Check if categories have changed
        if (req.body.category.name !== noteToEdit.category) {
          // If the new category already exists in another note, mark it as not new
          if (note.category !== req.body.category.name) {
            categoryIsNew = false;
          }
          // If the note to be edited is not the only note with the category, mark it as not only note with category
          else if (note.category === noteToEdit.category.name) {
            onlyNoteWithCategory = false;
          }
        }
        // Check if tags have changed
        if (req.body.tags !== noteToEdit.tags) {
          note.tags.forEach((tag) => {
            // If tag to add already exists in another note, remove it from the tags to add
            if (req.body.tags.includes(tag)) {
              tagsToAdd = tagsToAdd.filter((t) => t !== tag);
            }
            // If only the noteToEdit has the tag, add it to the tags to remove
            if (noteToEdit.tags.includes(tag)) {
              tagsToRemove = tagsToRemove.filter((t) => t !== tag);
            }
          });
        }
      }
    });

    // Updating the global array of categories and tags
    // If the category is new, create it
    if (categoryIsNew) {
      noteItem.categories.push(req.body.category);
    }
    // Remove the category from the categories array if it is the only note with the category
    if (onlyNoteWithCategory) {
      noteItem.categories = noteItem.categories.filter(
        (category) => category.name !== req.body.category.name
      );
    }
    // Add the tags to the tags array
    tagsToAdd.forEach((tag) => {
      noteItem.tags.push(tag);
    });
    // Remove the tags from the tags array
    tagsToRemove.forEach((tag) => {
      noteItem.tags = noteItem.tags.filter((t) => t !== tag);
    });
  }

  // Update the note with the new data
  noteToEdit.title = req.body.title;
  noteToEdit.description = req.body.description;
  noteToEdit.category = req.body.category.name;
  noteToEdit.tags = req.body.tags;

  // Put new note data into noteItem
  noteItem.notes[noteIdx] = noteToEdit;

  notes
    .item(req.body.userID, req.body.userID)
    .upsert(noteItem)
    .then(({ resource: noteItem }) => {
      res.status(200).json({
        message: "Note updated successfully",
        noteItem,
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

const removeNote = async (req, res) => {
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
