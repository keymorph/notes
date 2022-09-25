import { NOTES_ORDER_BY } from "../../models/note-order";

function orderNotesCollectionByOrderBy(
  notesCollection,
  categoriesCollection,
  orderBy
) {
  switch (orderBy) {
    case NOTES_ORDER_BY.RECENT:
      // Order notes by latest using the note property "created_at"
      return notesCollection.sort((a, b) => {
        return b.created_at - a.created_at;
      });
    case NOTES_ORDER_BY.OLDEST:
      // Order notes by oldest using the note property "created_at"
      return notesCollection.sort((a, b) => {
        return a.created_at - b.created_at;
      });
    case NOTES_ORDER_BY.CATEGORY_NAME:
      // Order notes by category name using the note property "category_id"
      // If the note has no category, it will be displayed last
      return notesCollection.sort((a, b) => {
        const categoryA = categoriesCollection.find(
          (category) => category.id === a.category_id
        );
        const categoryB = categoriesCollection.find(
          (category) => category.id === b.category_id
        );
        if (categoryA.name === "") {
          return 1;
        } else if (categoryB.name === "") {
          return -1;
        } else {
          return categoryA.name.localeCompare(categoryB.name);
        }
      });
    case NOTES_ORDER_BY.NOTE_TITLE:
      // Order notes by note title using the note property "title"
      return notesCollection.sort((a, b) => {
        return a.title.localeCompare(b.title) || 0;
      });
    default:
      return notesCollection;
  }
}

/**
 * Get the order Notes Collection based on the passed orderBy string
 *
 * @param {Array<Object>} notesCollection - The notes collection
 * @param {Array<Object>} categoriesCollection - The categories collection
 * @param {Array<Object>} orderedNotesID - The array of ordered notes IDs
 * @param {string} orderBy - Used to specify the order
 * @returns {Array<Object>} - The ordered notes collection
 */
export function getOrderedNotesCollection(
  notesCollection,
  categoriesCollection,
  orderedNotesID,
  orderBy
) {
  if (orderBy === NOTES_ORDER_BY.CUSTOM) {
    return orderedNotesID
      .map((noteID) => {
        return notesCollection.find((note) => note.id === noteID);
      })
      .filter((note) => note !== undefined);
  } else {
    return orderNotesCollectionByOrderBy(
      notesCollection,
      categoriesCollection,
      orderBy
    );
  }
}

/**
 * Returns an updated orderedNotesID array based on notesCollection.
 *
 * @param {Array<string>} orderedNotesID - The array of ordered notes IDs
 * @param {Array<Object>} notesCollection - The notes collection used as reference for updating the orderedNotesID array
 */
export function getUpdatedOrderedNotesID(orderedNotesID, notesCollection) {
  const notesID = notesCollection.map((note) => note.id);
  // Remove any undefined notes from the ordered notes collection. undefined notes result from the user deleting a note.
  let updatedOrderedNotesID = orderedNotesID.filter((noteID) => {
    return notesID.includes(noteID);
  });

  if (notesCollection.length > updatedOrderedNotesID.length) {
    // If the notes collection is longer than the ordered notes collection, add the missing notes to the ordered notes collection.
    const notesIdToAdd = notesID.filter((noteID) => {
      return !updatedOrderedNotesID.includes(noteID);
    });

    updatedOrderedNotesID = [...notesIdToAdd, ...updatedOrderedNotesID];
  }

  return updatedOrderedNotesID;
}
