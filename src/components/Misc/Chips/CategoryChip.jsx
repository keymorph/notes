import { Circle, HighlightOff } from "@mui/icons-material";
import { Box, Chip, IconButton, Input, useTheme } from "@mui/material";
import { AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";
import { useState } from "react";
import PopIn from "../../Transitions/PopIn";

export default function CategoryChip({
  categoryName,
  categoryColor,
  setCategoryName,
  setCategoryColor,
  onDelete,
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
        sx={{
          width: "100%",
        }}
        icon={
          <IconButton
            size={"small"}
            color={"inherit"}
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
        }
        label={
          <Input
            defaultValue={categoryName}
            placeholder={"Name the category"}
            disableUnderline
            onChange={(e) => setCategoryName(e.target.value)}
          />
        }
        deleteIcon={<HighlightOff sx={{ ml: "auto !important" }} />}
        onDelete={onDelete}
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
