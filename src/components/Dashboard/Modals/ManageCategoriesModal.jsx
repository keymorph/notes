import { AddCircleOutline } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Card,
  Grow,
  IconButton,
  Input,
  InputAdornment,
  Modal,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { CATEGORY_NAME_CHAR_LIMIT } from "../../../constants/input-limits";
import { updateCategories } from "../../../helpers/requests/category-requests";
import { modalCard } from "../../../styles/components/modals/modal";
import {
  adornmentButtonTransition,
  springShort,
  variantFadeSlideDownStagger,
} from "../../../styles/transitions/definitions";
import { doesCategoryExist } from "../../../utils/input-validation/validate-category";
import CategoryChip from "./Category/CategoryChip";

export default function ManageCategoriesModal({
  modalOpen,
  handleModalClose,
  categoriesCollection,
  setCategoriesCollection,
}) {
  //#region Hooks
  const [inputCategoryName, setInputCategoryName] = useState("");
  const [modifiedCategories, setModifiedCategories] = useState([]);

  const [noCategoriesDisplayed, setNoCategoriesDisplayed] = useState(false);

  useEffect(() => {
    // Reflect any changes to categoriesCollection in modifiedCategories
    setModifiedCategories(categoriesCollection);
  }, [categoriesCollection]);

  const isCategoryNew = !doesCategoryExist(
    inputCategoryName,
    modifiedCategories
  );

  //#region Query Handling Hooks
  // Updates the categories collection in the database
  const { mutate: mutateUpdate, status: updateStatus } = useMutation(
    updateCategories,
    {
      onSuccess: ({ data }) => {
        setCategoriesCollection(data.categories);
        handleModalClose();
      },
      onError: (error) => {
        console.error(error);
      },
    }
  );
  //#endregion
  //#endregion

  // Filter out the empty "" category names
  // From the filtered categories, filter out the ones that don't match the inputCategoryName if it's not empty
  const filteredCategories = modifiedCategories.filter(
    (category) =>
      !!category.name.trim() &&
      (inputCategoryName === "" ||
        category.name.toLowerCase().includes(inputCategoryName.toLowerCase()))
  );

  // If there are no filtered categories delay the display of the no categories message to avoid flicker
  if (filteredCategories.length === 0 && !noCategoriesDisplayed) {
    setTimeout(() => {
      setNoCategoriesDisplayed(true);
    }, 400);
  } else if (filteredCategories.length > 0 && noCategoriesDisplayed) {
    setNoCategoriesDisplayed(false);
  }

  console.log("filteredCategories", filteredCategories);

  //#region Handlers
  const handleSaveCategories = () => {
    mutateUpdate(modifiedCategories);
  };

  const handleCategorySearch = (e) => {
    setInputCategoryName(e.target.value);
  };

  // Change the previous name of the category to the new one
  const handleRenameCategory = (prevCategoryName, newCategoryName) => {
    if (prevCategoryName !== newCategoryName) {
      setModifiedCategories((prevCategories) =>
        prevCategories.map((category) =>
          category.name === prevCategoryName
            ? { ...category, name: newCategoryName }
            : category
        )
      );
    }
  };

  const handleRecolorCategory = (
    categoryName,
    prevCategoryColor,
    categoryColor
  ) => {
    if (prevCategoryColor !== categoryColor) {
      setModifiedCategories((prevCategories) =>
        prevCategories.map((category) =>
          category.name === categoryName
            ? { ...category, color: categoryColor }
            : category
        )
      );
    }
  };

  const handleCreateCategory = () => {
    if (isCategoryNew) {
      setModifiedCategories((prevCategories) => [
        { name: inputCategoryName, color: "none" },
        ...prevCategories,
      ]);
      setInputCategoryName("");
    }
  };

  const handleDeleteCategory = (categoryName) => {
    setModifiedCategories((prevCategories) =>
      prevCategories.filter((category) => category.name !== categoryName)
    );
  };
  //#endregion

  return (
    <Modal open={modalOpen} onClose={handleModalClose} closeAfterTransition>
      <Grow in={modalOpen}>
        <Card sx={modalCard}>
          <Typography variant="h5" color={"primary"}>
            Manage Categories
          </Typography>
          <Input
            placeholder="Search or add a category"
            value={inputCategoryName}
            onChange={handleCategorySearch}
            onKeyUp={(e) => e.key === "Enter" && handleCreateCategory()}
            endAdornment={
              <InputAdornment position="end">
                <Tooltip title="Add Category" placement="top" arrow>
                  <IconButton
                    onClick={handleCreateCategory}
                    sx={adornmentButtonTransition}
                    disabled={!isCategoryNew}
                  >
                    <AddCircleOutline />
                  </IconButton>
                </Tooltip>
              </InputAdornment>
            }
            inputProps={{
              maxLength: CATEGORY_NAME_CHAR_LIMIT,
            }}
            sx={{ my: "1em" }}
          />
          <Stack
            direction={"column"}
            spacing={2}
            py={"1em"}
            px={"1.5em"}
            overflow={"scroll"}
            height={["20rem", "22rem", "24rem", "28rem", "32rem"]}
          >
            <AnimatePresence>
              {filteredCategories.map((category, index) => (
                <motion.div
                  key={category.name}
                  layout
                  transition={springShort}
                  variants={variantFadeSlideDownStagger}
                  custom={index}
                  initial={"hidden"}
                  animate={"visible"}
                  exit={"hidden"}
                >
                  <CategoryChip
                    categoryName={category.name}
                    categoryColor={category.color}
                    setCategoryName={(categoryName) =>
                      handleRenameCategory(category.name, categoryName)
                    }
                    setCategoryColor={(categoryColor) =>
                      handleRecolorCategory(
                        category.name,
                        category.color,
                        categoryColor
                      )
                    }
                    categoryCollection={modifiedCategories}
                    enableEdit
                    onDelete={() => handleDeleteCategory(category.name)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
            {noCategoriesDisplayed && (
              <Grow in>
                <Typography
                  textAlign={"center"}
                  variant="body1"
                  color={"primary"}
                >
                  No categories to display
                </Typography>
              </Grow>
            )}
          </Stack>
          <LoadingButton
            loading={updateStatus === "loading"}
            variant="contained"
            size="small"
            onClick={handleSaveCategories}
            sx={{
              border: "1px",
              mt: 2,
              ml: "auto",
            }}
          >
            Save
          </LoadingButton>
        </Card>
      </Grow>
    </Modal>
  );
}
