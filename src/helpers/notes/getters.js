import { arrayMove } from "@dnd-kit/sortable";

export function getCategoryColor(categoryId, categoriesCollection) {
  return categoriesCollection.find((category) => category.id === categoryId)
    ?.color;
}

export function getCategoryName(categoryId, categoriesCollection) {
  return categoriesCollection.find((category) => category.id === categoryId)
    ?.name;
}

export function getFilteredNotesCollection(
  notesCollection,
  categoriesCollection,
  searchValue,
  filterCategories
) {
  return notesCollection.filter((note) => {
    if (searchValue.trim() === "" && filterCategories.length === 0) {
      return true;
    } else if (searchValue.trim() !== "" && filterCategories.length === 0) {
      return (
        note.title.toLowerCase().includes(searchValue) ||
        note.description.toLowerCase().includes(searchValue) ||
        note.tags.includes(searchValue) ||
        getCategoryName(note.category_id, categoriesCollection).includes(
          searchValue
        )
      );
    } else if (searchValue.trim() === "" && filterCategories.length > 0) {
      return filterCategories.find(
        (category) => category.id === note.category_id
      );
    } else {
      return (
        note.title.toLowerCase().includes(searchValue) ||
        note.description.toLowerCase().includes(searchValue) ||
        note.tags.includes(searchValue) ||
        (getCategoryName(note.category_id, categoriesCollection).includes(
          searchValue
        ) &&
          filterCategories.includes(note.category_id))
      );
    }
  });
}

/**
 * Get the order Notes Collection based on the passed orderBy string
 *
 * @param {Array<Object>} notesCollection - The notes collection
 * @param {Array<Object>} notesOrder - All the stored order of the notes
 * @param {string} orderBy - Used to specify the order. Can be "latest" or "custom"
 * @returns {Array<Object>} - The ordered notes collection
 */
export function getOrderedNotesCollection(
  notesCollection,
  notesOrder,
  orderBy
) {
  if (orderBy === "latest") {
    // notesCollection already sorted by creation date
    return notesCollection;
  } else {
    let orderedNotesCollection = notesOrder[orderBy].map((noteID) => {
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
  }
}

export function getUpdatedNotesOrder(
  notesCollection,
  notesOrder,
  orderBy,
  swappedNoteOldIndex,
  swappedNoteNewIndex
) {
  let existingNotesOrder = { ...notesOrder };

  if (!notesOrder || !notesOrder[orderBy] || notesOrder[orderBy].length === 0) {
    existingNotesOrder = {
      custom: notesCollection.map((note) => note.id),
      ...existingNotesOrder,
    };
  } else if (notesOrder[orderBy].length < notesCollection.length) {
    // If the ordered notes collection is smaller than the notes collection,
    // it means that a note was added after ordering was updated in the database.
    // We need to add the new note to the ordered notes collection.
    existingNotesOrder[orderBy] = [
      ...notesCollection
        .filter((note) => !notesOrder[orderBy].includes(note.id))
        .map((note) => note.id),
      ...notesOrder[orderBy],
    ];
  } else if (notesOrder[orderBy].length > notesCollection.length) {
    // If larger, it means that a note was deleted after ordering was updated in the database.
    // We need to remove the deleted note from the ordered notes collection.
    existingNotesOrder[orderBy] = notesOrder[orderBy].filter((noteID) =>
      notesCollection.find((note) => note.id === noteID)
    );
  }
  // Swap the notes in the ordered notes collection
  existingNotesOrder[orderBy] = arrayMove(
    existingNotesOrder[orderBy],
    swappedNoteOldIndex,
    swappedNoteNewIndex
  );
  return existingNotesOrder;
}
