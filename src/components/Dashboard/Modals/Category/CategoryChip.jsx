import {
  CheckCircleOutline,
  Circle,
  DeleteOutline,
  EditOutlined,
  HighlightOff,
} from "@mui/icons-material";
import {
  Box,
  Chip,
  IconButton,
  Input,
  Stack,
  Tooltip,
  useTheme,
  Zoom,
} from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { CATEGORY_NAME_CHAR_LIMIT } from "../../../../constants/input-limits";
import {
  adornmentButtonTransition,
  variantFadeSlideDownSlow,
} from "../../../../styles/transitions/definitions";
import { doesCategoryExist } from "../../../../utils/input-validation/validate-category";
import PopIn from "../../../Transitions/PopIn";

export default function CategoryChip({
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
  const [newCategoryName, setNewCategoryName] = useState(categoryName);
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  // Determines if the category name is being edited (only used when enableEdit is true)
  const [editMode, setEditMode] = useState(false);
  // Disables the save functionality when editing the category
  const [disableSave, setDisableSave] = useState(false);

  useEffect(() => {
    setNewCategoryName(categoryName);
  }, [categoryName]);
  //#endregion

  const categoryColors = Object.keys(theme.palette.category);

  //#region Handlers
  const handleOpenPopper = () => {
    setIsPaletteOpen((isPaletteOpen) => !isPaletteOpen);
  };

  const handleCategoryNameChange = (e) => {
    const newCategoryName = e.target.value;
    setNewCategoryName(newCategoryName);

    const categoryExists = doesCategoryExist(
      newCategoryName,
      categoryCollection
    );

    if (newCategoryName.trim() === "" || categoryExists) {
      setDisableSave(true);
    } else {
      setDisableSave(false);
    }
  };

  const handleSetEditMode = () => {
    setIsPaletteOpen(false);
    setEditMode((editMode) => {
      if (editMode) {
        setCategoryName(newCategoryName.trim());
      }
      return !editMode;
    });
  };
  //#endregion

  return (
    <>
      <Chip
        icon={
          <Tooltip title="Change Color" placement="top" arrow>
            <IconButton
              size={"small"}
              disabled={!enableEdit}
              onClick={handleOpenPopper}
            >
              <Circle
                sx={{
                  color: categoryColor
                    ? `category.${categoryColor}`
                    : "category.none",
                  transition: "color 0.2s ease-in-out",
                }}
              />
            </IconButton>
          </Tooltip>
        }
        label={
          <Box display={"flex"} flexDirection={"row"} width={"100%"}>
            <Input
              value={newCategoryName}
              disabled={!editMode}
              disableUnderline
              fullWidth
              inputProps={{
                maxLength: CATEGORY_NAME_CHAR_LIMIT,
              }}
              sx={{
                width: "100% !important",
                overflow: "hidden",
                mr: "auto !important",
                "&.Mui-disabled": { pointerEvents: "none" },
              }}
              onChange={handleCategoryNameChange}
            />
            {/* Only enable edit/save buttons when enableEdit is true */}
            {enableEdit && (
              <IconButton
                size={"small"}
                onClick={handleSetEditMode}
                disabled={editMode && disableSave}
                sx={adornmentButtonTransition}
              >
                <div style={{ width: "1em", height: "1em" }}>
                  <Zoom in={!editMode} unmountOnExit>
                    <EditOutlined
                      sx={{
                        position: "absolute",
                        top: "0.15em",
                        left: "0.1em",
                      }}
                    />
                  </Zoom>
                  <Zoom in={editMode} unmountOnExit>
                    <CheckCircleOutline
                      sx={{
                        position: "absolute",
                        top: "0.15em",
                        left: "0.1em",
                      }}
                    />
                  </Zoom>
                </div>
              </IconButton>
            )}
          </Box>
        }
        deleteIcon={
          <Tooltip
            title={enableEdit ? "Delete Category" : "Remove Category from Note"}
            placement="top"
            arrow
          >
            <IconButton size={"small"}>
              {/* If the category has both enableEdit, then it is in an editable context and
              as such it should display the icon indicating that the category can be deleted. */}
              <Zoom in={enableEdit} unmountOnExit>
                <div>
                  <DeleteOutline
                    color={"action"}
                    sx={{
                      display: "flex",
                      "&:hover": {
                        color: "error.main",
                      },
                      transition: "all 0.2s ease-in-out",
                    }}
                  />
                </div>
              </Zoom>
              <Zoom in={!enableEdit} unmountOnExit>
                <HighlightOff />
              </Zoom>
            </IconButton>
          </Tooltip>
        }
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "start",
          height: "3em",
          width: "100%",
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
                      sx={{
                        color: `category.${color}`,
                      }}
                      size={"small"}
                      onClick={() => {
                        setCategoryColor(color);
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
    </>
  );
}

CategoryChip.propTypes = {
  label: PropTypes.string,
  categoryName: PropTypes.string,
  categoryColor: PropTypes.string,
  setNewCategoryName: PropTypes.func,
  setNewCategoryColor: PropTypes.func,
  onClick: PropTypes.func,
  onDelete: PropTypes.func,
};
