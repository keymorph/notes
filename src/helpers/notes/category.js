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

export function getCategoryName(categoryId, categoriesCollection) {
  return categoriesCollection.find((category) => category.id === categoryId)
    ?.name;
}
