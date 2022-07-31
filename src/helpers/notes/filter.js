import { getCategoryName } from "./category";

export function getFilteredNotesCollection(
  notesCollection,
  categoriesCollection,
  searchValue,
  filterCategories
) {
  return notesCollection.filter((note) => {
    if (searchValue.trim() === "" && filterCategories.length === 0) {
      return true;
    }

    const searchValueMatch =
      note.title.toLowerCase().includes(searchValue) ||
      note.description.toLowerCase().includes(searchValue) ||
      note.tags.includes(searchValue) ||
      getCategoryName(note.category_id, categoriesCollection).includes(
        searchValue
      );
    const filterCategoriesMatch = filterCategories.find(
      (category) => category.id === note.category_id
    );

    if (searchValue.trim() !== "" && filterCategories.length === 0) {
      return searchValueMatch;
    } else if (searchValue.trim() === "" && filterCategories.length > 0) {
      return filterCategoriesMatch;
    } else {
      return searchValueMatch && filterCategoriesMatch;
    }
  });
}
