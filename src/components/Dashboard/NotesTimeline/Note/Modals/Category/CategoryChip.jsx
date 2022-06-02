import { Circle, HighlightOff } from "@mui/icons-material";
import { Box, Chip, IconButton, Input, Tooltip, useTheme } from "@mui/material";
import { AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";
import { useState } from "react";
import PopIn from "../../../../../Transitions/PopIn";

export default function CategoryChip({
  categoryName,
  categoryColor,
  setCategoryName = null,
  setCategoryColor = null,
  onSelect = null,
  onDelete = null,
  disableEdit = true,
  chipStyles = {},
}) {
  const theme = useTheme();
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);

  const categoryColors = Object.keys(theme.palette.category);

  const handleOpenPopper = () => {
    setIsPaletteOpen(!isPaletteOpen);
  };

  return (
    <>
      <Chip
        icon={
          <Tooltip title="Change Color" placement="top" arrow>
            <IconButton
              size={"small"}
              disabled={disableEdit}
              onClick={handleOpenPopper}
            >
              <Circle
                sx={{
                  color: categoryColor
                    ? `category.${categoryColor}`
                    : "category.none",
                }}
              />
            </IconButton>
          </Tooltip>
        }
        label={
          <Input
            defaultValue={categoryName}
            placeholder={"Name the category"}
            disabled={true} // Indefinitely disabled for now
            disableUnderline
            onChange={(e) => setCategoryName(e.target.value)}
          />
        }
        deleteIcon={
          <Tooltip title="Remove Category" placement="top" arrow>
            <HighlightOff sx={{ ml: "auto !important" }} />
          </Tooltip>
        }
        style={chipStyles}
        onDelete={onDelete}
        onClick={onSelect}
        variant="outlined"
      />

      <AnimatePresence>
        {isPaletteOpen && (
          <PopIn>
            <Box
              display={"flex"}
              flexDirection={"row"}
              py={"1em"}
              sx={{
                overflowX: "scroll",
                overflowY: "hidden",
                // boxShadow: `inset 2em 0px 1em -1em #000, inset -2em 0px 1em -1em #000`,
              }}
            >
              {categoryColors.map((category, index) => (
                <PopIn key={index}>
                  <IconButton
                    sx={{
                      color: `category.${category}`,
                    }}
                    size={"small"}
                    onClick={() => {
                      setCategoryColor(category);
                    }}
                  >
                    <Circle fontSize={"large"} />
                  </IconButton>
                </PopIn>
              ))}
            </Box>
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
