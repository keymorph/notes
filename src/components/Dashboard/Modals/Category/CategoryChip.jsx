import { Circle, HighlightOff } from "@mui/icons-material";
import {
  Chip,
  IconButton,
  Input,
  Stack,
  Tooltip,
  useTheme,
} from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import PropTypes from "prop-types";
import { useState } from "react";
import { variantFadeSlideDownSlow } from "../../../../styles/transitions/definitions";
import PopIn from "../../../Transitions/PopIn";

export default function CategoryChip({
  categoryName,
  categoryColor,
  setCategoryName = null,
  setCategoryColor = null,
  onSelect = null,
  onDelete = null,
  enableEditColor = false,
  enableEditName = false,
  chipStyles = {},
}) {
  const theme = useTheme();
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);

  const categoryColors = Object.keys(theme.palette.category);

  const handleOpenPopper = () => {
    setIsPaletteOpen((isPaletteOpen) => !isPaletteOpen);
  };

  return (
    <>
      <Chip
        icon={
          <Tooltip title="Change Color" placement="top" arrow>
            <IconButton
              autoFocus={enableEditColor}
              size={"small"}
              disabled={!enableEditColor}
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
          <Input
            defaultValue={categoryName}
            placeholder={"Name the category"}
            disabled={!enableEditName}
            disableUnderline
            fullWidth
            sx={{
              textOverflow: "ellipsis",
              overflow: "hidden",
              "&.Mui-disabled": { pointerEvents: "none" },
            }}
            onChange={(e) => setCategoryName(e.target.value)}
          />
        }
        deleteIcon={
          <Tooltip title="Remove Category" placement="top" arrow>
            <IconButton size={"small"} sx={{ ml: "auto !important" }}>
              <HighlightOff />
            </IconButton>
          </Tooltip>
        }
        sx={{
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
            <Stack direction={"row"} py={"1em"} overflow={["hidden", "hidden"]}>
              <AnimatePresence>
                {categoryColors.map((category, index) => (
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
                        color: `category.${category}`,
                      }}
                      size={"small"}
                      onClick={() => {
                        setCategoryColor(category);
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
