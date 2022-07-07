/**
 * Returns true if category exists. Performs a Case-insensitive check
 *
 * @param {string} categoryName
 * @param {Object} categoriesCollection
 * @returns {boolean}
 */
export function doesCategoryExist(categoryName, categoriesCollection) {
  if (categoriesCollection.length > 0) {
    return categoriesCollection.find(
      (category) =>
        category.name.toLowerCase() === categoryName.trim().toLowerCase()
    );
  }
  return false;
}

/**
 * Returns true if a category name is the same as another category in the collection
 *
 * @param {Object} categoriesCollection
 * @returns {boolean}
 */
export function doCategoryNamesCollide(categoriesCollection) {
  let categoryNames = categoriesCollection.map((category) => category.name);
  return categoryNames.some((categoryName, index) => {
    return categoryNames.indexOf(categoryName) !== index;
  });
}

/**
 * Returns a clean and formatted category name
 *
 * @param {string} categoryName
 */
export function getValidCategoryName(categoryName) {
  // Only accept alpha-numeric characters and spaces
  return categoryName
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}
