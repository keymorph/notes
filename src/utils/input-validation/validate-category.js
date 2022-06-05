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
