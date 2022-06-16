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
