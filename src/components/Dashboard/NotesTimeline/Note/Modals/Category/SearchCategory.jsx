import { Add } from "@mui/icons-material";
import {
  IconButton,
  Input,
  InputAdornment,
  Stack,
  Tooltip,
} from "@mui/material";
import { useState } from "react";
import CategoryChip from "./CategoryChip";

export default function SearchCategory({
  categories,
  categoryName,
  setCategoryName,
  setCategoryColor,
  setIsCategoryNew,
  setDisplayCategoryChip,
}) {
  const [filteredCategories, setFilteredCategories] = useState(
    categories.filter((category) => !!category.name.trim())
  );
  const [categoryExists, setCategoryExists] = useState(false);

  const handleCategorySearch = (e) => {
    setCategoryName(e.target.value);

    setFilteredCategories(
      categories.filter(
        (category) =>
          !!category.name.trim() &&
          category.name.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );

    setCategoryExists(
      categories.find((category) => category.name === e.target.value)
    );
  };

  const handleSelectCategory = (categoryName, categoryColor) => {
    setDisplayCategoryChip(true);
    setCategoryName(categoryName);
    setCategoryColor(categoryColor);
  };

  const handleAddCategory = () => {
    setDisplayCategoryChip(true);
    setIsCategoryNew(true);
  };

  return (
    <>
      <Input
        placeholder="Search or add a category"
        value={categoryName}
        onChange={handleCategorySearch}
        endAdornment={
          <InputAdornment position="end">
            <Tooltip title="Add Category" placement="top" arrow>
              <IconButton
                onClick={handleAddCategory}
                disabled={categoryName.trim() === "" || categoryExists}
              >
                <Add />
              </IconButton>
            </Tooltip>
          </InputAdornment>
        }
      />
      {/* Display searched categories horizontally */}
      {categories?.length > 0 && (
        <Stack direction={"row"} spacing={2} py={"1em"} overflow={"scroll"}>
          {filteredCategories.map((category) => (
            <CategoryChip
              key={category.name}
              categoryName={category.name}
              categoryColor={category.color}
              onSelect={() =>
                handleSelectCategory(category.name, category.color)
              }
              chipStyles={{ width: "10em" }}
            />
          ))}
        </Stack>
      )}
    </>
  );
}
