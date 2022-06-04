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
import {
  springShort,
  variantFadeSlideDown,
} from "../../../../styles/transitions/definitions";
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
  const [categoryExists, setCategoryExists] = useState(false);

  const isCategoryValid = categoryName?.trim() !== "" && !categoryExists;

  const handleCategorySearch = (e) => {
    setCategoryName(e.target.value);

    setFilteredCategories(
      categoriesCollection.filter(
        (category) =>
          !!category.name.trim() &&
          category.name.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );

    setCategoryExists(
      categoriesCollection.find(
        (category) =>
          category.name.toLowerCase() === e.target.value.toLowerCase()
      )
    );
  };

  const handleSelectCategory = (categoryName, categoryColor) => {
    setDisplayCategoryChip(true);
    setCategoryName(categoryName);
    setCategoryColor(categoryColor);
  };

  const handleAddCategory = () => {
    if (isCategoryValid) {
      setDisplayCategoryChip(true);
      setIsCategoryNew(true);
    }
  };

  return (
    <>
      <Input
        placeholder="Search or add a category"
        value={categoryName}
        onChange={handleCategorySearch}
        onKeyUp={(e) => e.key === "Enter" && handleAddCategory()}
        endAdornment={
          <InputAdornment position="end">
            <Tooltip title="Add Category" placement="top" arrow>
              <IconButton
                onClick={handleAddCategory}
                sx={{ transition: "all 0.2s ease-in-out" }}
                disabled={!isCategoryValid}
              >
                <AddCircleOutline />
              </IconButton>
            </Tooltip>
          </InputAdornment>
        }
      />
      {/* Display searched categories horizontally */}
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
