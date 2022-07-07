/**
 * Generates a unique id based on the last category's ID. If the category is found, its id is returned.
 * If the category name is an empty string, it means no category has been assigned to it and the id returned is always 0.
 *
 * @param categoriesCollection
 * @param categoryName
 * @returns {number}
 */
export function getOrCreateCategoryID(categoriesCollection, categoryName) {
  let categoryID = 1; // 0 is reserved for the default category (no category)
  const categoryNameLower = categoryName.trim().toLowerCase();

  // If the category name is an empty string or there are no categories, then assign the default category id 0
  if (categoryNameLower === "") {
    categoryID = 0;
  } else {
    // Get a new id or the existing id if the category is found
    categoriesCollection.some((category) => {
      if (category.name.toLowerCase() === categoryNameLower) {
        categoryID = category.id;
        return true; // Stop the loop since the category was found
      } else if (category.id >= categoryID) {
        categoryID = category.id + 1;
      }
    });
  }

  return categoryID;
}

/**
 * Creates a category ID based on the last category ID.
 * If noCategory is true, it means no category has been assigned to it and the id returned is always 0.
 *
 * @param categoriesCollection
 * @param noCategory
 * @returns {number}
 */
export function createCategoryID(categoriesCollection, noCategory = false) {
  let categoryID = 1;

  // If the category name is an empty string or there are no categories, then assign the default category id 0
  if (noCategory) {
    categoryID = 0;
  } else {
    // Get a new id or the existing id if the category is found
    categoriesCollection.forEach((category) => {
      if (category.id >= categoryID) {
        categoryID = category.id + 1;
      }
    });
  }
}
