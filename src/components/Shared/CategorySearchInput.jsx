import { AddCircleOutline } from "@mui/icons-material";
import { IconButton, Input, InputAdornment } from "@mui/material";
import { CATEGORY_NAME_CHAR_LIMIT } from "../../constants/input-limits";
import { getValidCategoryName } from "../../helpers/notes/category";
import { adornmentButtonTransition } from "../../styles/animations/definitions";
import CustomTooltip from "./CustomTooltip";
import RemainingCharCount from "./RemainingCharCount";

export default function CategorySearchInput({
  categoryName,
  setCategoryName,
  categoryExists = false,
  onCreate = null,
  fullWidth = false,
  sx = {},
}) {
  //#region Handlers
  const handleCategorySearch = (e) => {
    setCategoryName(getValidCategoryName(e.target.value));
  };

  const handleAddCategory = () => {
    if (isCategoryValid) {
      onCreate();
    }
  };
  //#endregion

  const isCategoryValid = categoryName.trim() !== "" && !categoryExists;

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
            <RemainingCharCount
              stringLength={categoryName.length}
              characterLimit={CATEGORY_NAME_CHAR_LIMIT}
            />
            <CustomTooltip
              title={"Create a category with this name"}
              disableableButton
            >
              <IconButton
                color={"neutral"}
                size={"small"}
                onClick={handleAddCategory}
                sx={adornmentButtonTransition}
                disabled={!isCategoryValid}
              >
                <AddCircleOutline />
              </IconButton>
            </CustomTooltip>
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
