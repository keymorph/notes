import { Check } from "@mui/icons-material";
import {
  Box,
  Chip,
  Grow,
  Input,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { CATEGORY_NAME_CHAR_LIMIT } from "../../../constants/input-limits";
import { variantFadeStagger } from "../../../styles/transitions/definitions";

export default function FilterView({
  categoriesCollection,
  filterCategories,
  setFilterCategories,
}) {
  //#region Hooks
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [searchValue, setSearchValue] = useState("");
  const [noCategoriesDisplayed, setNoCategoriesDisplayed] = useState(false);
  //#endregion

  // S
  const filteredCategories = categoriesCollection.filter((category) => {
    return (
      category.name !== "" &&
      category.name.toLowerCase().includes(searchValue.toLowerCase())
    );
  });

  const categoryChips = filteredCategories.map((category, index) => {
    const isSelected = filterCategories.find(
      (filterCategory) => filterCategory.id === category.id
    );
    const chipColor = isSelected ? "primary" : "paper";

    return (
      <motion.div
        key={category.id}
        layout
        variants={variantFadeStagger}
        whileTap={{ scale: 0.95 }}
        custom={index}
        initial={"hidden"}
        animate={"visible"}
        exit={"hidden"}
      >
        <Chip
          label={
            <Box display={"flex"} justifyContent={"space-between"}>
              <Typography
                color={chipColor}
                sx={{ transition: "all 0.2s ease-in-out" }}
              >
                {category.name}
              </Typography>
              <Check
                color={chipColor}
                sx={{
                  display: "flex",
                  transition: "all 0.2s ease-in-out",
                }}
              />
            </Box>
          }
          onClick={() => handleCategorySelect(category.id)}
          sx={{ cursor: "pointer" }}
          variant={"outlined"}
          size={isMobile ? "small" : "medium"}
        />
      </motion.div>
    );
  });

  // If there are no searched categories, delay the display of the no categories message to avoid flicker
  if (filteredCategories.length === 0 && !noCategoriesDisplayed) {
    setTimeout(() => {
      setNoCategoriesDisplayed(true);
    }, 400);
  } else if (filteredCategories.length > 0 && noCategoriesDisplayed) {
    setNoCategoriesDisplayed(false);
  }

  //#region Handlers
  const handleCategorySearch = (event) => {
    const searchValue = event.target.value;
    setSearchValue(searchValue);
  };

  const handleCategorySelect = (categoryID) => {
    if (filterCategories.find((category) => category.id === categoryID)) {
      setFilterCategories((prev) =>
        prev.filter((category) => category.id !== categoryID)
      );
    } else {
      setFilterCategories([
        ...filterCategories,
        categoriesCollection.find((category) => category.id === categoryID),
      ]);
    }
  };
  //#endregion

  console.log(filterCategories);

  return (
    <Box>
      <Typography variant="h6">Filter By Category</Typography>
      <Input
        placeholder={"Search Category..."}
        fullWidth
        onChange={handleCategorySearch}
        inputProps={{
          maxLength: CATEGORY_NAME_CHAR_LIMIT,
        }}
        sx={{ maxWidth: "20rem", mt: "0.5rem", alignSelf: "center" }}
      />
      <Box
        display={"flex"}
        gap={"0.5rem"}
        pt={"1rem"}
        flexWrap={"wrap"}
        minWidth={isMobile ? "100%" : "24rem"}
        height={"8rem"}
        overflow={"scroll"}
      >
        <AnimatePresence>{categoryChips}</AnimatePresence>
      </Box>
      {noCategoriesDisplayed && (
        <Grow in>
          <Typography textAlign={"center"} variant="body1">
            No categories to display
          </Typography>
        </Grow>
      )}
    </Box>
  );
}
