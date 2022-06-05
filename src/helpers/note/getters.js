export function getCategoryColor(categoryId, categoriesCollection) {
  return categoriesCollection.find((category) => category.id === categoryId)
    ?.color;
}

export function getCategoryName(categoryId, categoriesCollection) {
  return categoriesCollection.find((category) => category.id === categoryId)
    ?.name;
}
