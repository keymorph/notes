import { Circle, DeleteOutline, HighlightOff } from "@mui/icons-material";
import {
  Chip,
  IconButton,
  Input,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { CATEGORY_NAME_CHAR_LIMIT } from "../../../../constants/input-limits";
import {
  getCategoryColorFromPalette,
  getPaletteCategoryColorName,
  getValidCategoryName,
  isCategoryNameUnique,
} from "../../../../helpers/notes/category";
import { variantFadeSlideDownSlow } from "../../../../styles/animations/definitions";
import { categoryColors as categoryColorsDef } from "../../../../styles/themes/theme";
import CustomTooltip from "../../../Shared/CustomTooltip";
import PopIn from "../../../Transitions/PopIn";

export default function EditableCategoryChip({
  categoryName,
  categoryColor,
  setCategoryName = null,
  setCategoryColor = null,
  categoryCollection = [],
  onSelect = null,
  onDelete = null,
  enableEdit = false,
  chipStyles = {},
}) {
  //#region Hooks
  const theme = useTheme();
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  //#endregion

  //#region Handlers
  const handlePaletteOpen = () => {
    setIsPaletteOpen((isPaletteOpen) => !isPaletteOpen);
  };

  const handleCategoryNameChange = (e) => {
    const newCategoryName = getValidCategoryName(e.target.value);
    setCategoryName(newCategoryName);
  };
  //#endregion

  const invalidCategoryName =
    categoryName === "" ||
    !isCategoryNameUnique(categoryName, categoryCollection);

  const categoryColors = Object.keys(
    theme.palette.mode === "dark"
      ? categoryColorsDef.dark
      : categoryColorsDef.light
  );
  const color = getPaletteCategoryColorName(categoryColor);

  return (
    <div>
      <Chip
        color={invalidCategoryName ? "error" : "chipNeutral"}
        icon={
          <IconButton
            size={"small"}
            disabled={!enableEdit}
            onClick={handlePaletteOpen}
          >
            <CustomTooltip
              title={
                isPaletteOpen
                  ? "Close category color palette"
                  : "Open category color palette"
              }
            >
              <Circle
                color={color}
                sx={{
                  fontSize: "1.75rem",
                  transition: "color 0.2s ease-in-out",
                }}
              />
            </CustomTooltip>
          </IconButton>
        }
        label={
          enableEdit ? (
            <Input
              placeholder={"Enter the category name..."}
              value={categoryName}
              disableUnderline
              fullWidth
              inputProps={{
                maxLength: CATEGORY_NAME_CHAR_LIMIT,
              }}
              sx={{
                overflow: "hidden",
                mr: "auto !important",
                "&.Mui-disabled": { pointerEvents: "none" },
              }}
              onChange={handleCategoryNameChange}
            />
          ) : (
            <Typography variant={"body1"}>{categoryName}</Typography>
          )
        }
        deleteIcon={
          <IconButton size={"small"}>
            {/* This tooltip is a children of button to prevent it from overriding the onClick event passed by the chip */}
            <CustomTooltip
              title={
                enableEdit ? "Delete category" : "Remove category from note"
              }
            >
              {enableEdit ? (
                <DeleteOutline color={"chipNeutral"} />
              ) : (
                <HighlightOff color={"chipNeutral"} />
              )}
            </CustomTooltip>
          </IconButton>
        }
        sx={{
          width: "100%",
          px: "0.25rem",
          height: "2.5rem",
          transition: "all 0.2s ease-in-out",
          ...chipStyles,
        }}
        onDelete={onDelete}
        onClick={onSelect}
        variant="outlined"
      />

      <AnimatePresence>
        {isPaletteOpen && (
          <PopIn>
            <Stack direction={"row"} py={"1em"} overflow={"scroll"}>
              <AnimatePresence>
                {categoryColors.map((color, index) => (
                  <motion.div
                    key={index}
                    variants={variantFadeSlideDownSlow}
                    whileTap={{ scale: 0.9 }}
                    initial={"hidden"}
                    animate={"visible"}
                    exit={"hidden"}
                  >
                    <IconButton
                      color={color}
                      size={"small"}
                      onClick={() => {
                        setCategoryColor(getCategoryColorFromPalette(color));
                      }}
                    >
                      <Circle fontSize={"large"} />
                    </IconButton>
                  </motion.div>
                ))}
              </AnimatePresence>
            </Stack>
          </PopIn>
        )}
      </AnimatePresence>
    </div>
  );
}
