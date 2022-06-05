export function getOrCreateCategoryId(categoriesCollection, categoryName) {
  let categoryId = 1; // 0 is reserved for the default category (no category)
  const categoryNameLower = categoryName.trim().toLowerCase();

  // If the category name is an empty string or there are no categories, then assign the default category id 0
  if (categoryNameLower === "") {
    categoryId = 0;
  } else {
    // Get a new id or the existing id if the category is found
    categoriesCollection.some((category) => {
      if (category.name.toLowerCase() === categoryNameLower) {
        categoryId = category.id;
        return true; // Stop the loop since the category was found
      } else if (category.id >= categoryId) {
        categoryId = category.id + 1;
      }
    });
  }

  return categoryId;
}
