import { Check } from "@mui/icons-material";
import {
  Box,
  Card,
  Chip,
  Grow,
  Input,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { getSearchedCategories } from "../../../helpers/filter/categories-filtering";
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

  const searchedAndSortedCategories = getSearchedCategories(
    categoriesCollection,
    searchValue
  );

  const categoryChips = searchedAndSortedCategories.map((category, index) => {
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
  if (searchedAndSortedCategories.length === 0 && !noCategoriesDisplayed) {
    setTimeout(() => {
      setNoCategoriesDisplayed(true);
    }, 400);
  } else if (searchedAndSortedCategories.length > 0 && noCategoriesDisplayed) {
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
    <motion.div
      initial={{ opacity: 0, y: "-2rem" }}
      animate={{
        opacity: 1,
        y: 0,
        transition: { duration: 0.3, ease: "easeInOut" },
      }}
    >
      <Card
        sx={{
          borderRadius: "0",
          px: "1em",
          pb: "1em",
        }}
      >
        <Typography variant="h6">Filter By Category</Typography>
        <Input
          placeholder={"Search Category..."}
          fullWidth
          onChange={handleCategorySearch}
          sx={{ maxWidth: "24rem" }}
        ></Input>
        <Box
          display={"flex"}
          gap={"0.5em"}
          pt={"1em"}
          flexWrap={"wrap"}
          sx={{
            transition: "max-height 2s ease-in-out",
            overFlow: "hidden",
            maxHeight: "25vh",
          }}
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
      </Card>
    </motion.div>
  );
}
