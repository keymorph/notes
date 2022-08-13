import { Check } from "@mui/icons-material";
import { Box, Chip, Typography } from "@mui/material";
import { motion } from "framer-motion";
import React from "react";
import { getPaletteCategoryColorName } from "../../helpers/notes/category";
import { variantFadeStagger } from "../../styles/animations/definitions";

export default function CategoryChip({
  index,
  name,
  color,
  selected = false,
  selectable = false,
  size = "medium",
  onClick,
}) {
  const chipColor =
    selected || !selectable
      ? getPaletteCategoryColorName(color)
      : "chipNeutral";

  return (
    <motion.div
      layout
      variants={variantFadeStagger}
      whileTap={{ scale: 0.95 }}
      custom={index}
      initial={"hidden"}
      animate={"visible"}
      exit={"hidden"}
    >
      <Chip
        color={chipColor}
        label={
          <Box display={"flex"} justifyContent={"space-between"}>
            {selectable && selected && (
              <Check
                sx={{
                  color: `category.${color}`,
                  display: "flex",
                  transition: "all 0.2s ease-in-out",
                  mr: "0.5rem",
                }}
              />
            )}
            <Typography sx={{ transition: "all 0.2s ease-in-out" }}>
              {name}
            </Typography>
          </Box>
        }
        onClick={onClick}
        variant={selected || !selectable ? "filled" : "outlined"}
        size={size}
      />
    </motion.div>
  );
}
