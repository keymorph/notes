import { notes } from "../models/database";

export const createNoteItemIfNotExists = async (userID) => {
  // Get the note resource object
  const { resource: noteItem } = await notes
    .item(userID, userID)
    .read()
    .catch((error) => {
      console.error(error.message);
      throw new Error("Database error while creating note");
    });

  // If the note item does not exist, create it
  if (!noteItem) {
    const noteItemDef = {
      id: userID, // The user ID is the same as the note item ID allowing for a 1:1 relationship
      notes: [],
      categories: [
        {
          id: 0,
          name: "",
          color: "none",
          note_count: 0,
        },
      ],
      tags: [],
      last_note_id: -1,
      created_at: noteItem?.created_at || Math.round(Date.now() / 1000), // Seconds since Unix epoch
    };

    return notes.items
      .upsert(noteItemDef)
      .then(({ resource: noteItem }) => {
        return noteItem;
      })
      .catch((error) => {
        console.error(error.message);
        throw new Error("Database error while creating note");
      });
  } else {
    return noteItem;
  }
};
