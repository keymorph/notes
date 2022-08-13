import { Box, Grow, Typography, useMediaQuery, useTheme } from "@mui/material";
import { AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import CategoryChip from "../../Shared/CategoryChip";
import CategorySearchInput from "../../Shared/CategorySearchInput";

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

    return (
      <CategoryChip
        key={category.id}
        index={index}
        name={category.name}
        color={category.color}
        selected={isSelected}
        selectable
        size={isMobile ? "small" : "medium"}
        onClick={() => handleCategorySelect(category.id)}
      />
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

  return (
    <Box width={"100%"}>
      <Typography variant="h6">Filter By Category:</Typography>
      <CategorySearchInput
        categoryName={searchValue}
        setCategoryName={setSearchValue}
        fullWidth
        sx={{ maxWidth: "20rem", mt: "0.5rem", alignSelf: "center" }}
      />
      <Box
        display={"flex"}
        gap={"0.5rem"}
        pt={"1rem"}
        flexWrap={"wrap"}
        minWidth={isMobile ? "100%" : "24rem"}
        maxHeight={"8rem"}
        sx={{ overflowX: "hidden" }}
      >
        <AnimatePresence>{categoryChips}</AnimatePresence>
        {noCategoriesDisplayed && (
          <Grow in>
            <Typography textAlign={"center"} variant="body1">
              No categories to display.
            </Typography>
          </Grow>
        )}
      </Box>
    </Box>
  );
}
