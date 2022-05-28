import { notes } from "../models/database.js";

// Category object
// {
//   category_name: "Chicken",
//   color: "Yellow"
//   note_count: 1, Number of notes in this category, always 1 when creating a note
// }
const createNote = async (req, res) => {
  // Get the note resource object
  const { resource: noteItem } = await notes
    .item(req.headers.userid, req.headers.userid)
    .read()
    .catch((error) => {
      console.error(error.message);
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

  let notesObjArr = [noteDef]; // Base case if there are no notes
  let categoriesObjArr = [
    {
      name: req.body.category.name,
      color: req.body.category.color,
      note_count: 1,
    },
  ]; // Base case if there are no categories
  let tagsArr = req.body.tags; // Base case if there are no tags

  // If the user has a note resource already, add the new note to it. Otherwise, create a new note resource.
  if (noteItem) {
    const categoryIdx = noteItem.categories.findIndex(
      (category) => category.name === noteDef.category // Case-insensitive comparison
    );
    const tagsToAdd = noteDef.tags.filter(
      (tag) => !noteItem.tags.includes(tag)
    );

    // If the category already exists, update the note count
    if (categoryIdx !== -1) {
      noteItem.categories[categoryIdx].note_count++;
      categoriesObjArr = noteItem.categories;
    } else {
      categoriesObjArr = noteItem.categories.concat(categoriesObjArr);
    }

    tagsArr = noteItem.tags.concat(tagsToAdd);
    notesObjArr = noteItem.notes.concat(noteDef);
  }

  // Note Item object with the noteDef object pushed to the notes array
  const noteItemDef = {
    id: req.headers.userid, // The user ID is the same as the note item ID allowing for a 1:1 relationship
    notes: notesObjArr, // Note array object with all the notes inside
    categories: categoriesObjArr,
    tags: tagsArr,
    last_note_id: noteDef.id,
    created_at: noteItem?.created_at || Math.round(Date.now() / 1000), // Seconds since Unix epoch
  };

  return notes.items
    .upsert(noteItemDef)
    .then(({ resource: noteItem }) => {
      return res.status(201).json({
        message: "Note created successfully",
        note: noteItem.notes[noteItem.notes.length - 1],
      });
    })
    .catch((error) => {
      console.error(error.message);
      return res.status(500).json({
        message: "Database error while creating note",
      });
    });
};

// notesCollection > documents > evansDocument,
//                               dantesDocument,
//                               richsDocument ------>
//                     notes: [
//                                {
//                                  note 1
//                                }

//                                {
//                                 note 2
//                               }
//                               ]
// categories [

// ]
// // {
//  notes: [
//   {"title"
// "description"
// "category"
// "tags"
// "id"
// "created_at"
// },
// {"title"
// "description"
// "category"
// "tags"
// "id"
// "created_at"
// },
// {"title"
// "description"
// "category"
// "tags"
// "id"
// "created_at"
// }
// ]
// }
//   title: req.body.title,
//   description: req.body.description,
//   category: req.body.category.name, // The category the note belongs to
//   tags: req.body.tags, // The tags the note has
//   id: noteItem?.last_note_id + 1 || 1, // Set note_id to the last note's id number + 1
//   created_at: Math.round(Date.now() / 1000), // Seconds since Unix epoch
// };

const getNoteItem = async (req, res) => {
  return notes
    .item(req.headers.userid, req.headers.userid)
    .read()
    .then(({ resource: noteItem }) => {
      return res.status(200).json({
        message: "Note retrieved successfully",
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
    .item(req.headers.userid, req.headers.userid)
    .read()
    .catch((error) => {
      console.error(error.message);
      return res.status(200).json({
        message: "Database error while editing note",
      });
    });

  // Get the note to be edited
  const noteIdx = noteItem.notes.findIndex(
    (note) => note.id == req.body.noteID
  );
  const noteToEdit = noteItem.notes[noteIdx];
  let [categoriesObjArr, tagsArr] = [noteItem.categories, noteItem.tags];
  let categoryIsNew = true; // Track if the category is new
  let tagsToAdd = req.body.tags; // Track the tags to be added

  // Check if categories have changed. If so, update the note count
  if (req.body.category.name !== noteToEdit.category) {
    categoriesObjArr.forEach((category) => {
      if (category.name === noteToEdit.category && category.note_count > 0) {
        category.note_count--;
      } else if (category.name === req.body.category.name) {
        category.note_count++;
        categoryIsNew = false;
      }
    });
    if (categoryIsNew) {
      categoriesObjArr.push({
        name: req.body.category.name,
        color: req.body.category.color,
        note_count: 1,
      });
    }
  }
  // Check if tags have changed, if so, add the new tags to the global tags array
  if (req.body.tags !== noteToEdit.tags) {
    tagsToAdd = req.body.tags.filter((tag) => !tagsArr.includes(tag));
    tagsArr = tagsArr.concat(tagsToAdd);
  }

  // Update the note with the new data
  const editedNote = noteToEdit;
  editedNote.title = req.body.title;
  editedNote.description = req.body.description;
  editedNote.category = req.body.category.name;
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
    .item(req.headers.userid, req.headers.userid)
    .patch(noteItemPatchOperation)
    .then(() => {
      return res.status(200).json({
        message: "Note updated successfully",
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
    .item(req.headers.userid, req.headers.userid)
    .read()
    .catch((error) => {
      console.error(error.message);
      return res.status(200).json({
        message: "Database error while deleting note",
      });
    });

  // Get the note to be deleted
  const noteIdx = noteItem.notes.findIndex(
    (note) => note.id == req.body.noteID
  );
  const noteToDelete = noteItem.notes[noteIdx];

  if (noteToDelete === undefined) {
    return res.status(200).json({
      message: "Note not found. It may have already been deleted",
    });
  }

  let categoriesObjArr = noteItem.categories;
  // Decrement the category's note count.
  categoriesObjArr.forEach((category) => {
    if (category.name === noteToDelete.category && category.note_count > 0) {
      category.note_count--;
    }
  });

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
    .item(req.headers.userid, req.headers.userid)
    .patch(noteItemPatchOperation)
    .then(() => {
      return res.status(200).json({
        message: "Note deleted successfully",
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
