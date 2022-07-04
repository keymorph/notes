import { AddCircleOutline } from "@mui/icons-material";
import {
  IconButton,
  Input,
  InputAdornment,
  Stack,
  Tooltip,
} from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { CATEGORY_NAME_CHAR_LIMIT } from "../../../../constants/input-limits";
import {
  adornmentButtonTransition,
  springShort,
  variantFadeSlideDown,
} from "../../../../styles/animations/definitions";
import { doesCategoryExist } from "../../../../utils/input-validation/validate-category";
import PopIn from "../../../Transitions/PopIn";
import CategoryChip from "./CategoryChip";

export default function SearchCategory({
  categoriesCollection,
  categoryName,
  setCategoryName,
  setCategoryColor,
  setIsCategoryNew,
  setDisplayCategoryChip,
}) {
  const [filteredCategories, setFilteredCategories] = useState(
    categoriesCollection.filter((category) => !!category.name.trim())
  );
  const [newCategoryName, setNewCategoryName] = useState(categoryName);
  const [categoryExists, setCategoryExists] = useState(false);

  const isCategoryValid = newCategoryName.trim() !== "" && !categoryExists;

  const handleCategorySearch = (e) => {
    const searchValue = e.target.value;
    setNewCategoryName(searchValue);

    setFilteredCategories(
      categoriesCollection.filter(
        (category) =>
          !!category.name &&
          category.name.toLowerCase().includes(searchValue.trim().toLowerCase())
      )
    );

    setCategoryExists(doesCategoryExist(searchValue, categoriesCollection));
  };

  const handleSelectCategory = (categoryName, categoryColor) => {
    setDisplayCategoryChip(true);
    setCategoryName(categoryName);
    setCategoryColor(categoryColor);
  };

  const handleAddCategory = () => {
    if (isCategoryValid) {
      setCategoryName(newCategoryName);
      setDisplayCategoryChip(true);
      setIsCategoryNew(true);
    }
  };

  return (
    <>
      <Input
        placeholder="Search or add a category"
        value={newCategoryName}
        onChange={handleCategorySearch}
        onKeyUp={(e) => e.key === "Enter" && handleAddCategory()}
        endAdornment={
          <InputAdornment position="end">
            <Tooltip title="Add Category" placement="top" arrow>
              <IconButton
                size={"small"}
                onClick={handleAddCategory}
                sx={adornmentButtonTransition}
                disabled={!isCategoryValid}
              >
                <AddCircleOutline />
              </IconButton>
            </Tooltip>
          </InputAdornment>
        }
        inputProps={{
          maxLength: CATEGORY_NAME_CHAR_LIMIT,
        }}
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
                {filteredCategories.map((category) => (
                  <motion.div
                    key={category.name}
                    layout
                    transition={springShort}
                    variants={variantFadeSlideDown}
                    whileTap={{ scale: 0.95 }}
                    initial={"hidden"}
                    animate={"visible"}
                    exit={"hidden"}
                  >
                    <CategoryChip
                      categoryName={category.name}
                      categoryColor={category.color}
                      onSelect={() =>
                        handleSelectCategory(category.name, category.color)
                      }
                      chipStyles={{ width: "10em" }}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </Stack>
          </PopIn>
        )}
      </AnimatePresence>
    </>
  );
}
