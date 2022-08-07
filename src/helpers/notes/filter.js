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

    let descriptionMatch = false;
    if (typeof note.description !== "string") {
      descriptionMatch = note.description.content.some((content) => {
        if (content.text) {
          return content.text.toLowerCase().includes(searchValue.toLowerCase());
        } else if (content.content) {
          return content.content.some((content) => {
            return content.text
              .toLowerCase()
              .includes(searchValue.toLowerCase());
          });
        }
      });
    } else {
      descriptionMatch = note.description
        .toLowerCase()
        .includes(searchValue.toLowerCase());
    }

    const searchValueMatch =
      note.title.toLowerCase().includes(searchValue) ||
      descriptionMatch ||
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
