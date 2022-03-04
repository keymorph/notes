import { notes } from "../models/database.js";

// Category object
// {
//   category_name: "Chicken",
//   color: "Yellow"
//   note_count: 1, Number of notes in this category, always 1 when creating a note
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


    //

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
    const categoryIdx = noteItem.categories.findIndex(
      (category) =>
        category.name.toLowerCase() === noteDef.category.toLowerCase() // Case-insensitive comparison
    );
    const tagsToAdd = noteDef.tags.filter(
      (tag) => !noteItem.tags.includes(tag)
    );

    // If the category already exists, update the note count
    if (categoryIdx !== -1) {
      noteItem.categories[categoryIdx].note_count++;
    }

    categoriesObjArr =
      categoryIdx !== -1
        ? noteItem.categories
        : [...noteItem.categories, req.body.category];
    tagsArr = noteItem.tags.concat(tagsToAdd);
    notesObjArr = noteItem.notes.concat(noteDef);
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
    created_at: noteItem?.created_at || Math.round(Date.now() / 1000), // Seconds since Unix epoch
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
  notes
    .item(req.body.userID, req.body.userID)
    .read()
    .then(({ resource: noteItem }) => {
      console.log("NOTEITEM", noteItem)
      res.status(200).json({
        message: "Note retrieved successfully",
        noteItem,
      });
    })
    .catch((err) => {
      console.log("BOOOOOOM")
      console.error(err);
      return res.status(500).json({
        message: "Database error while retrieving note",
      });
    });
};

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
  let [categoriesObjArr, tagsArr] = [noteItem.categories, noteItem.tags];

  // Check if the categories and/or tags have changed
  // Update their respective global array if they have
  if (
    req.body.category.name !== noteToEdit.category ||
    req.body.tags !== noteToEdit.tags
  ) {
    // Track onlyNoteWithCategory for the unedited old note data and categoryIsNew for the edited new note
    let [onlyNoteWithCategory, categoryIsNew] = [true, true];
    // Track tagsToRemove for the unedited old note data and tagsToAdd for the edited new note
    let [tagsToRemove, tagsToAdd] = [noteToEdit.tags, req.body.tags];

    noteItem.notes.forEach((note) => {
      if (note.id !== noteToEdit.id) {
        // Check if categories have changed
        if (req.body.category.name !== noteToEdit.category) {
          // If the new category already exists in another note, mark it as not new
          if (note.category === req.body.category.name) {
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

    if (req.body.category.name !== noteToEdit.category) {
      // Updating the global array of categories and tags
      // If the category is new, create it
      if (categoryIsNew) {
        categoriesObjArr.push(req.body.category);
      }
      // Remove the category from the categories array if it is the only note with the category
      if (onlyNoteWithCategory) {
        categoriesObjArr = categoriesObjArr.filter(
          (category) => category.name !== noteToEdit.category
        );
      }
    }

    if (req.body.tags !== noteToEdit.tags) {
      // Add the tags to the tags array
      tagsToAdd.forEach((tag) => {
        tagsArr.push(tag);
      });
      // Remove the tags from the tags array
      tagsToRemove.forEach((tag) => {
        tagsArr = tagsArr.filter((t) => t !== tag);
      });
    }
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

  notes
    .item(req.userID, req.userID)
    .patch(noteItemPatchOperation)
    .then(() => {
      res.status(200).json({
        message: "Note updated successfully",
      });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({
        message: "Database error while updating note",
      });
    });

  // notes
  //   .item(req.body.userID, req.body.userID)
  //   .upsert(noteItem)
  //   .then(({ resource: noteItem }) => {
  //     res.status(200).json({
  //       message: "Note updated successfully",
  //       noteItem,
  //     });
  //   })
  //   .catch((err) => {
  //     console.error(err);
  //     return res.status(500).json({
  //       message: "Database error while updating note",
  //     });
  //   });
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
