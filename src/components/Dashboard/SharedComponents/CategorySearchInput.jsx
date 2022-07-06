import { AddCircleOutline } from "@mui/icons-material";
import { IconButton, Input, InputAdornment } from "@mui/material";
import { CATEGORY_NAME_CHAR_LIMIT } from "../../../constants/input-limits";
import { adornmentButtonTransition } from "../../../styles/animations/definitions";
import { getValidCategoryName } from "../../../utils/input-validation/validate-category";

export default function CategorySearchInput({
  categoryName,
  setCategoryName,
  categoryExists = false,
  onCreate = null,
  fullWidth = false,
  sx = {},
}) {
  const isCategoryValid = categoryName.trim() !== "" && !categoryExists;

  const handleCategorySearch = (e) => {
    setCategoryName(getValidCategoryName(e.target.value));
  };

  const handleAddCategory = () => {
    if (isCategoryValid) {
      onCreate();
    }
  };

  return (
    <Input
      placeholder={
        onCreate ? "Search or create a category..." : "Search a category..."
      }
      value={categoryName}
      onChange={handleCategorySearch}
      onKeyUp={(e) => e.key === "Enter" && handleAddCategory()}
      endAdornment={
        onCreate ? (
          <InputAdornment position="end">
            <IconButton
              color={"neutral"}
              size={"small"}
              onClick={handleAddCategory}
              sx={adornmentButtonTransition}
              disabled={!isCategoryValid}
            >
              <AddCircleOutline />
            </IconButton>
          </InputAdornment>
        ) : null
      }
      inputProps={{
        maxLength: CATEGORY_NAME_CHAR_LIMIT,
      }}
      fullWidth={fullWidth}
      sx={sx}
    />
  );
}
