/**
 * Returns true if category exists. Performs a Case-insensitive check
 *
 * @param {string} categoryName
 * @param {Object} categoryCollection
 * @returns {boolean}
 */
export function doesCategoryExist(categoryName, categoryCollection) {
  if (categoryCollection.length > 0) {
    return categoryCollection.find(
      (category) =>
        category.name.toLowerCase() === categoryName.trim().toLowerCase()
    );
  }
  return false;
}

/**
 * Returns a clean and formatted category name.
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
