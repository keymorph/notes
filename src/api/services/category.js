import { notes } from "../models/database";
import { createNoteItemIfNotExists } from "./note-helper";

const replaceCategory = async (req, res) => {
  const noteItem = await createNoteItemIfNotExists(req.headers.user_id).catch(
    (error) => {
      console.error(error.message);
      return res.status(500).json({
        message: "Database error while reading item",
      });
    }
  );

  let noteCountToAddToEmptyCategory = 0;
  const newCategoryIds = req.body.categories.map((category) => category.id);
  const editedNotes = noteItem.notes.map((note) => {
    // If a note is found with an id different from the new category ids, it means that the category was removed
    // As such, we set the category_id to 0 which is the default category
    if (newCategoryIds.indexOf(note.category_id) === -1) {
      note.category_id = 0;
      noteCountToAddToEmptyCategory++;
    }
    return note;
  });

  // Update the no category note count
  req.body.categories.some((category) => {
    if (category.id === 0) {
      category.note_count += noteCountToAddToEmptyCategory;
      return true;
    }
  });

  const noteItemPatchOperation = [
    {
      op: "replace",
      path: `/notes`,
      value: editedNotes,
    },
    {
      op: "replace",
      path: "/categories",
      value: req.body.categories,
    },
  ];

  return notes
    .item(req.headers.user_id, req.headers.user_id)
    .patch(noteItemPatchOperation)
    .then(({ resource: noteItem }) => {
      return res.status(200).json({
        message: "Categories updated successfully",
        noteItem,
      });
    })
    .catch((error) => {
      console.error(error.message);
      return res.status(500).json({
        message: "Database error while updating categories",
      });
    });
};

const categoryService = {
  update: replaceCategory,
};

export default categoryService;
