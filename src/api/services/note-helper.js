import {notes} from "../models/database";

/**
 * Creates a note item if one doesn't already exist. If no or an invalid user_id is provided, an error will be thrown.
 *
 * @param {string} userID The user ID of the user to find or create the note item for
 * @returns {Promise<*>}
 */
export const createNoteItemIfNotExists = async (userID) => {
  if (!userID) {
    throw new Error("User ID is required");
  }

  // Get the note resource object
  const { resource: noteItem } = await notes
    .item(userID, userID)
    .read()
    .catch((error) => {
      console.error(error.message);
      throw new Error("Database error while reading note item");
    });

  // If the note item does not exist, create it
  if (!noteItem) {
    const noteItemDef = {
      id: userID, // The user ID is the same as the note item ID allowing for a 1:1 relationship
      notes: [],
      notes_order: {
        ordered_notes_id: [],
        order_by: "recent",
      },
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
        throw new Error("Database error while creating note item");
      });
  } else {
    return noteItem;
  }
};
