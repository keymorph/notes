export function getSearchedCategories(categoriesCollection, searchValue) {
  return categoriesCollection.filter((category) => {
    return (
      category.name !== "" &&
      category.name.toLowerCase().includes(searchValue.toLowerCase())
    );
  });
}

export function getSelectedCategoriesOrdered(
  categoriesCollection,
  filterCategoriesCollection
) {
  const categoriesCollectionCopy = [...categoriesCollection];
  return categoriesCollectionCopy
    .sort((a, b) => {
      const aIndex = filterCategoriesCollection.findIndex(
        (category) => category.id === a.id
      );
      const bIndex = filterCategoriesCollection.findIndex(
        (category) => category.id === b.id
      );
      return aIndex - bIndex;
    })
    .reverse();
}
