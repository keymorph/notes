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
  // If the category name is found in the collection more than once then it is not unique
  return (
    categoriesCollection.filter((category) => category.name === categoryName)
      .length === 1
  );
}
