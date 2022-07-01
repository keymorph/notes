import { arrayMove } from "@dnd-kit/sortable";
import { NOTES_ORDER_BY } from "../models/note-order";

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
      return notesCollection.sort((a, b) => {
        const categoryA = categoriesCollection.find(
          (category) => category.id === a.category_id
        );
        const categoryB = categoriesCollection.find(
          (category) => category.id === b.category_id
        );
        if (categoryA && categoryB) {
          return categoryA.name.localeCompare(categoryB.name);
        } else {
          return 0;
        }
      });
    case NOTES_ORDER_BY.NOTE_TITLE:
      // Order notes by note title using the note property "title"
      return notesCollection.sort((a, b) => {
        return a.title.localeCompare(b.title);
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
 * @param {Array<Object>} orderedNotesID - The IDs of the notes as ordered by the user
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
    let orderedNotesCollection = orderedNotesID.map((noteID) => {
      return notesCollection.find((note) => note.id === noteID);
    });
    // Remove any undefined notes from the ordered notes collection. undefined notes result from the user deleting a note.
    orderedNotesCollection = orderedNotesCollection.filter(
      (note) => note !== undefined
    );
    if (orderedNotesCollection.length === 0) {
      return notesCollection;
    } else if (orderedNotesCollection.length < notesCollection.length) {
      // If the ordered notes collection is smaller than the notes collection,
      // it means that a note was added after ordering was updated in the database.
      // We need to add the new note to the ordered notes collection.
      return [
        ...notesCollection.filter(
          (note) => !orderedNotesCollection.includes(note)
        ),
        ...orderedNotesCollection,
      ];
    } else {
      return orderedNotesCollection;
    }
  } else {
    return orderNotesCollectionByOrderBy(
      notesCollection,
      categoriesCollection,
      orderBy
    );
  }
}

/**
 * Swaps the order of two notes in the ordered notes collection
 *
 * @param {Array<Object>} orderedNotesCollection - The ordered notes collection
 * @param {Array<number>} orderedNotesID - The IDs of the notes as ordered by the user
 * @param {string} orderBy - Used to specify the order
 * @param {number} oldIndex - The index of the note that was swapped
 * @param {number} newIndex - The index of where the dragged note was dropped into
 */
export function swapOrderedNotesID(
  orderedNotesCollection,
  orderedNotesID,
  orderBy,
  oldIndex,
  newIndex
) {
  let existingOrderedNotesID = orderedNotesID;

  if (!orderedNotesID || orderedNotesID.length === 0) {
    existingOrderedNotesID = orderedNotesCollection.map((note) => note.id);
  } else if (orderedNotesID.length < orderedNotesCollection.length) {
    // If the ordered notes collection is smaller than the notes collection,
    // it means that a note was added after ordering was updated in the database.
    // We need to add the new note to the ordered notes collection.
    existingOrderedNotesID = [
      ...orderedNotesCollection
        .filter((note) => !orderedNotesID.includes(note.id))
        .map((note) => note.id),
      ...orderedNotesID,
    ];
  } else if (orderedNotesID.length > orderedNotesCollection.length) {
    // If larger, it means that a note was deleted after ordering was updated in the database.
    // We need to remove the deleted note from the ordered notes collection.
    existingOrderedNotesID = orderedNotesID.filter((noteID) =>
      orderedNotesCollection.find((note) => note.id === noteID)
    );
  }

  console.log(existingOrderedNotesID);
  // Swap the notes in the ordered notes collection
  return arrayMove(existingOrderedNotesID, oldIndex, newIndex);
}
