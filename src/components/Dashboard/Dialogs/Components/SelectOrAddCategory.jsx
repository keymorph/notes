import { Stack } from "@mui/material";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { doesCategoryExist } from "../../../../helpers/notes/category";
import CategoryChip from "../../../Shared/CategoryChip";
import CategorySearchInput from "../../../Shared/CategorySearchInput";
import PopIn from "../../../Transitions/PopIn";

export default function SelectOrAddCategory({
  categoriesCollection,
  categoryName,
  setCategoryName,
  setCategoryColor,
  setIsCategoryNew,
  setDisplayCategoryChip,
}) {
  //#region Hooks
  const [filteredCategories, setFilteredCategories] = useState(
    categoriesCollection.filter((category) => !!category.name.trim())
  );
  const [newCategoryName, setNewCategoryName] = useState(categoryName);
  const [categoryExists, setCategoryExists] = useState(false);

  useEffect(() => {
    setFilteredCategories(
      categoriesCollection.filter(
        (category) => !!category.name && category.name.includes(newCategoryName)
      )
    );

    setCategoryExists(doesCategoryExist(newCategoryName, categoriesCollection));
  }, [newCategoryName, categoriesCollection]);
  //#endregion

  //#region Handlers
  const handleSelectCategory = (categoryName, categoryColor) => {
    setDisplayCategoryChip(true);
    setCategoryName(categoryName);
    setCategoryColor(categoryColor);
  };

  const handleCreateCategory = () => {
    if (isCategoryValid) {
      setCategoryName(newCategoryName);
      setDisplayCategoryChip(true);
      setIsCategoryNew(true);
    }
  };
  //#endregion

  const isCategoryValid = newCategoryName.trim() !== "" && !categoryExists;

  return (
    <div>
      <CategorySearchInput
        categoryName={newCategoryName}
        setCategoryName={setNewCategoryName}
        categoryExists={categoryExists}
        onCreate={handleCreateCategory}
        fullWidth
      />
      {/* Display category results below the search input */}
      <AnimatePresence>
        {filteredCategories.length > 0 && (
          <PopIn>
            <Stack
              direction={"row"}
              spacing={2}
              py={"1.5em"}
              overflow={"scroll"}
            >
              <AnimatePresence>
                {filteredCategories.map((category, index) => (
                  <CategoryChip
                    key={category.id}
                    index={index}
                    name={category.name}
                    color={category.color}
                    onClick={() =>
                      handleSelectCategory(category.name, category.color)
                    }
                    size={"medium"}
                  />
                ))}
              </AnimatePresence>
            </Stack>
          </PopIn>
        )}
      </AnimatePresence>
    </div>
  );
}
