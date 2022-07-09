export function getCategoryColorName(categoryId, categoriesCollection) {
  return categoriesCollection.find((category) => category.id === categoryId)
    ?.color;
}

export function getPaletteCategoryColorName(categoryColor) {
  // Makes the first letter upper case
  let colorName =
    categoryColor.charAt(0).toUpperCase() + categoryColor.slice(1);
  return `category${colorName}`;
}

export function getCategoryColorFromPalette(categoryColor) {
  // For a color string 'categoryTeal' return teal
  return categoryColor.replace(/category/, "").toLowerCase();
}

export function getCategoryName(categoryId, categoriesCollection) {
  return categoriesCollection.find((category) => category.id === categoryId)
    ?.name;
}

export function isCategoryNameUnique(categoryName, categoriesCollection) {
  // If the category name is found once then it is unique
  return (
    categoriesCollection.filter((category) => category.name === categoryName)
      .length === 1
  );
}

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

/**
 * Generates a unique id based on the last category's ID. If the category is found, its id is returned.
 * If the category name is an empty string, it means no category has been assigned to it and the id returned is always 0.
 *
 * @param categoriesCollection
 * @param categoryName
 * @returns {number}
 */
export function getOrCreateCategoryID(categoriesCollection, categoryName) {
  // If the category name is an empty string or there are no categories, then assign the default category id 0
  if (categoryName === "") {
    return 0;
  } else {
    let categoryID = getCategoryID(categoriesCollection, categoryName);
    if (categoryID === -1) {
      // If the category is not found, create a new category ID
      categoryID = createCategoryID(categoriesCollection);
    }
    return categoryID;
  }
}

/**
 * Creates a category ID based on the last category ID.
 *
 * @param categoriesCollection
 * @returns {number}
 */
export function createCategoryID(categoriesCollection) {
  let categoryID = 1; // We start at 1 since 0 is reserved for the default category (no category)

  categoriesCollection.forEach((category) => {
    if (category.id >= categoryID) {
      categoryID = category.id + 1;
    }
  });

  return categoryID;
}

/**
 * Gets the category ID based on the category name.
 *
 * @param categoriesCollection
 * @param categoryName
 * @returns {number}
 */
export function getCategoryID(categoriesCollection, categoryName) {
  let categoryID = -1;

  // Get a new id or the existing id if the category is found
  categoriesCollection.some((category) => {
    if (category.name === categoryName) {
      categoryID = category.id;
      return true; // Stop the loop since the category was found
    }
  });

  return categoryID;
}
