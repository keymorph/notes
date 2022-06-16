import { AddCircleOutline, Close, Restore } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Box,
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
import { getOrCreateCategoryId } from "../../../utils/id-utils";
import { doesCategoryExist } from "../../../utils/input-validation/validate-category";
import CategoryChip from "./Category/CategoryChip";

export default function ManageCategoriesModal({
  modalOpen,
  handleModalClose,
  categoriesCollection,
  setCategoriesCollection,
  setNoteCollection,
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
        setCategoriesCollection(data.noteItem.categories);
        setNoteCollection(data.noteItem.notes.reverse());
        handleModalClose();
      },
      onError: (error) => {
        console.error(error);
      },
    }
  );
  //#endregion
  //#endregion

  const categoriesChanged =
    JSON.stringify(modifiedCategories) !== JSON.stringify(categoriesCollection);
  // Filter out the empty "" category names
  // From the filtered categories, filter out the ones that don't match the inputCategoryName if it's not empty
  const filteredCategories = modifiedCategories.filter(
    (category) =>
      !!category.name.trim() &&
      (inputCategoryName === "" ||
        category.name
          .toLowerCase()
          .includes(inputCategoryName.trim().toLowerCase()))
  );

  // If there are no filtered categories, delay the display of the no categories message to avoid flicker
  if (filteredCategories.length === 0 && !noCategoriesDisplayed) {
    setTimeout(() => {
      setNoCategoriesDisplayed(true);
    }, 400);
  } else if (filteredCategories.length > 0 && noCategoriesDisplayed) {
    setNoCategoriesDisplayed(false);
  }

  //#region Helper Functions
  // Reset modal values is used when creating a note
  const resetModalValues = () => {
    setInputCategoryName("");
    setModifiedCategories(categoriesCollection);
  };
  //#endregion

  //#region Handlers
  const handleSaveCategories = () => {
    mutateUpdate({ categories: modifiedCategories });
  };

  const handleCategorySearch = (e) => {
    setInputCategoryName(e.target.value);
  };

  // Change the previous name of the category to the new one
  const handleRenameCategory = (
    categoryId,
    prevCategoryName,
    newCategoryName
  ) => {
    if (prevCategoryName !== newCategoryName) {
      setModifiedCategories((prevCategories) =>
        prevCategories.map((category) =>
          category.id === categoryId
            ? { ...category, name: newCategoryName }
            : category
        )
      );
    }
  };

  const handleRecolorCategory = (
    categoryId,
    prevCategoryColor,
    categoryColor
  ) => {
    if (prevCategoryColor !== categoryColor) {
      setModifiedCategories((prevCategories) =>
        prevCategories.map((category) =>
          category.id === categoryId
            ? { ...category, color: categoryColor }
            : category
        )
      );
    }
  };

  const handleCreateCategory = () => {
    console.log("input", inputCategoryName);
    if (isCategoryNew) {
      console.log(
        "id: ",
        getOrCreateCategoryId(modifiedCategories, inputCategoryName)
      );
      console.log("name: ", inputCategoryName);
      setModifiedCategories((prevCategories) => [
        {
          id: getOrCreateCategoryId(prevCategories, inputCategoryName),
          name: inputCategoryName,
          color: "none",
          note_count: 0,
        },
        ...prevCategories,
      ]);
      setInputCategoryName("");
    }
  };

  const handleDeleteCategory = (categoryId) => {
    setModifiedCategories((prevCategories) =>
      prevCategories.filter((category) => category.id !== categoryId)
    );
  };

  const handleBeforeModalClose = (event, reason) => {
    if (reason === "closeModal") {
      handleModalClose();
      setTimeout(() => {
        resetModalValues();
      }, 500); // Don't immediately reset the values till the closing animation is complete
    } else {
      handleModalClose();
    }
  };
  //#endregion

  return (
    <Modal open={modalOpen} onClose={handleModalClose} closeAfterTransition>
      <Grow in={modalOpen}>
        <Card sx={modalCard}>
          <Box display={"flex"}>
            <Typography
              display={"flex"}
              alignSelf={"center"}
              variant="h5"
              color={"primary"}
            >
              Manage Categories
            </Typography>
            <IconButton
              disabled={!categoriesChanged}
              onClick={resetModalValues}
              sx={{ ml: "auto", transition: "all 0.2s ease-in-out" }}
            >
              <Restore />
            </IconButton>
            <IconButton
              onClick={(event) => handleBeforeModalClose(event, "closeModal")}
              edge="end"
            >
              <Close />
            </IconButton>
          </Box>
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
                  key={category.id}
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
                      handleRenameCategory(
                        category.id,
                        category.name,
                        categoryName
                      )
                    }
                    setCategoryColor={(categoryColor) =>
                      handleRecolorCategory(
                        category.id,
                        category.color,
                        categoryColor
                      )
                    }
                    categoryCollection={modifiedCategories}
                    enableEdit
                    onDelete={() => handleDeleteCategory(category.id)}
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
            disabled={!categoriesChanged}
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
