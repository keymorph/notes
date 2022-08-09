import { notes } from "../models/database.js";
import { createNoteItemIfNotExists } from "./note-helper";

// SharedComponents object
// {
//   category_name: "Chicken",
//   color: "Yellow"
//   note_count: 1, Number of notes in this category, always 1 when creating a note
// }
const createNote = async (req, res) => {
  // Get the note resource object
  const noteItem = await createNoteItemIfNotExists(req.headers.user_id).catch(
    (error) => {
      console.error(error.message);
      return res.status(500).json({
        message: "Database error while creating or reading note item",
      });
    }
  );

  // Note object to be created
  const newNoteDef = {
    title: req.body.title || "",
    description: req.body.description || {},
    tags: req.body.tags, // The tags the note has
    category_id: req.body.category.id, // The category the note is in
    id: noteItem?.last_note_id + 1 || 1, // Set note_id to the last note's id number + 1
    created_at: Math.round(Date.now() / 1000), // Seconds since Unix epoch
  };
  // SharedComponents object to be created if it doesn't exist
  const newCategoryDef = {
    id: req.body.category.id,
    name: req.body.category.name,
    color: req.body.category.color,
    note_count: 1,
  };

  const notesObjArr = [...noteItem.notes, newNoteDef];

  let categoriesObjArr = noteItem.categories;
  const categoryIdx = categoriesObjArr.findIndex(
    (category) => category.id === newNoteDef.category_id
  );
  // If the category already exists, update the note count
  if (categoryIdx !== -1) {
    categoriesObjArr[categoryIdx].note_count++;
  } else {
    categoriesObjArr = [newCategoryDef, ...categoriesObjArr];
  }

  const tagsToAdd = newNoteDef.tags.filter(
    (tag) => !noteItem.tags.includes(tag)
  );
  const tagsArr = [...noteItem.tags, ...tagsToAdd];

  // Note Item object with the new note object pushed to the notes array
  const noteItemDef = {
    id: noteItem.id,
    notes: notesObjArr,
    categories: categoriesObjArr,
    tags: tagsArr,
    last_note_id: newNoteDef.id,
  };

  return notes.items
    .upsert(noteItemDef)
    .then(({ resource: noteItem }) => {
      return res.status(201).json({
        message: "Note created successfully",
        noteItem,
      });
    })
    .catch((error) => {
      console.error(error.message);
      return res.status(500).json({
        message: "Database error while creating note",
      });
    });
};

const getNoteItem = async (req, res) => {
  return notes
    .item(req.headers.user_id, req.headers.user_id)
    .read()
    .then(({ resource: noteItem }) => {
      return res.status(200).json({
        message: "Note Item retrieved successfully",
        noteItem,
      });
    })
    .catch((error) => {
      console.error(error.message);
      return res.status(500).json({
        message: "Database error while retrieving note",
      });
    });
};

const editNote = async (req, res) => {
  // Get the note resource object
  const { resource: noteItem } = await notes
    .item(req.headers.user_id, req.headers.user_id)
    .read()
    .catch((error) => {
      console.error(error.message);
      return res.status(500).json({
        message: "Database error while editing note",
      });
    });

  // Get the note to be edited
  const noteIdx = noteItem.notes.findIndex(
    (note) => note.id === req.body.noteID
  );
  if (noteIdx === -1) {
    return res.status(404).json({
      message: "Note to edit not found",
    });
  }
  const noteToEdit = noteItem.notes[noteIdx];

  let categoriesObjArr = noteItem.categories;
  let categoryIsNew = true; // Track if the category is new
  // Check if categories have changed. If so, update the note count
  if (req.body.category.id !== noteToEdit.category_id) {
    categoriesObjArr.forEach((category) => {
      if (category.id === noteToEdit.category_id && category.note_count > 0) {
        category.note_count--;
      } else if (category.id === req.body.category.id) {
        category.note_count++;
        categoryIsNew = false;
      }
    });
  } else {
    categoryIsNew = false;
  }
  // Create category if it is new
  if (categoryIsNew) {
    categoriesObjArr.push({
      id: req.body.category.id,
      name: req.body.category.name,
      color: req.body.category.color,
      note_count: 1,
    });
  }

  let tagsArr = noteItem.tags;
  let tagsToAdd = req.body.tags; // Track the tags to be added
  // Check if tags have changed, if so, add the new tags to the global tags array
  if (req.body.tags !== noteToEdit.tags) {
    tagsToAdd = req.body.tags.filter((tag) => !tagsArr.includes(tag));
    tagsArr = tagsArr.concat(tagsToAdd);
  }

  // Update the note with the new data
  const editedNote = noteToEdit;
  editedNote.title = req.body.title || "";
  editedNote.description = req.body.description || {};
  editedNote.category_id = req.body.category.id;
  editedNote.tags = req.body.tags;

  // Database Patch operation
  const noteItemPatchOperation = [
    {
      op: "replace",
      path: `/notes/${noteIdx}`,
      value: editedNote,
    },
    {
      op: "replace",
      path: "/categories",
      value: categoriesObjArr,
    },
    {
      op: "replace",
      path: "/tags",
      value: tagsArr,
    },
  ];

  return notes
    .item(req.headers.user_id, req.headers.user_id)
    .patch(noteItemPatchOperation)
    .then(({ resource: noteItem }) => {
      return res.status(200).json({
        message: "Note updated successfully",
        noteItem,
      });
    })
    .catch((error) => {
      console.error(error.message);
      return res.status(500).json({
        message: "Database error while updating note",
      });
    });
};

// Needs to be implemented
const removeNote = async (req, res) => {
  // Get the note resource object
  const { resource: noteItem } = await notes
    .item(req.headers.user_id, req.headers.user_id)
    .read()
    .catch((error) => {
      console.error(error.message);
      return res.status(500).json({
        message: "Database error while deleting note",
      });
    });

  // Get the note to be deleted
  const noteIdx = noteItem.notes.findIndex(
    (note) => note.id === req.body.noteID
  );
  const noteToDelete = noteItem.notes[noteIdx];
  if (!noteToDelete) {
    return res.status(404).json({
      message: "Note not found. It may have already been deleted",
    });
  }

  let categoriesObjArr = noteItem.categories;
  // Decrement the category's note count.
  categoriesObjArr.forEach((category) => {
    if (category.id === noteToDelete.category_id && category.note_count > 0) {
      category.note_count--;
    }
  });

  // TODO: Tag removal from global tags array (Do we even want a global tags array?)

  // Database Patch operation
  const noteItemPatchOperation = [
    {
      op: "remove",
      path: `/notes/${noteIdx}`,
    },
    {
      op: "replace",
      path: "/categories",
      value: categoriesObjArr,
    },
  ];

  return notes
    .item(req.headers.user_id, req.headers.user_id)
    .patch(noteItemPatchOperation)
    .then(({ resource: noteItem }) => {
      return res.status(200).json({
        message: "Note deleted successfully",
        noteItem,
      });
    })
    .catch((error) => {
      console.error(error.message);
      return res.status(500).json({
        message: "Database error while deleting note",
      });
    });
};

const noteService = {
  create: createNote,
  show: getNoteItem,
  edit: editNote,
  remove: removeNote,
};
export default noteService;
