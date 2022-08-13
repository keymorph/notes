import { LoadingButton } from "@mui/lab";
import { Dialog, Grow, Stack, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import {
  doCategoryNamesCollide,
  doesCategoryExist,
  getOrCreateCategoryID,
} from "../../../helpers/notes/category";
import { updateCategories } from "../../../helpers/requests/category-requests";
import { MODAL_ACTIONS } from "../../../models/dialogs";
import {
  springShort,
  variantFadeSlideDownStagger,
} from "../../../styles/animations/definitions";
import { DialogCard } from "../../../styles/components/cards";
import CategorySearchInput from "../../Shared/CategorySearchInput";
import EditableCategoryChip from "./Components/EditableCategoryChip";
import Titlebar from "./Components/Titlebar";

export default function ManageCategoriesDialog({
  dialogOpen,
  handleDialogClose,
  categoriesCollection,
  setCategoriesCollection,
  setNoteCollection,
  isMobile,
}) {
  //#region Hooks

  const [inputCategoryName, setInputCategoryName] = useState("");
  const [modifiedCategories, setModifiedCategories] = useState([]);

  const [noCategoriesDisplayed, setNoCategoriesDisplayed] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    // Reflect any changes to categoriesCollection in modifiedCategories
    setModifiedCategories(categoriesCollection);
  }, [categoriesCollection]);

  //#region Query Handling Hooks

  // Updates the categories collection in the database
  const { mutate: mutateUpdate, status: updateStatus } = useMutation(
    updateCategories,
    {
      onSuccess: ({ data }) => {
        setCategoriesCollection(data.noteItem.categories);
        setNoteCollection(data.noteItem.notes.reverse());
        handleDialogClose();
      },
      onError: (error) => {
        console.error(error);
        enqueueSnackbar("An error occurred while saving the categories", {
          variant: "error",
        });
      },
    }
  );

  //#endregion

  //#endregion

  const categoriesChanged =
    JSON.stringify(modifiedCategories) !== JSON.stringify(categoriesCollection);
  const isCategoryNew = !doesCategoryExist(
    inputCategoryName,
    modifiedCategories
  );
  // Filter out the empty "" category names
  // From the filtered categories, filter out the ones that don't match the inputCategoryName if it's not empty
  const filteredCategories = modifiedCategories.filter(
    (category) =>
      category.id !== 0 &&
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

  // Change the previous name of the category to the new one
  const handleRenameCategory = (
    categoryId,
    prevCategoryName,
    newCategoryName
  ) => {
    setModifiedCategories((prevCategories) =>
      prevCategories.map((category) =>
        category.id === categoryId
          ? { ...category, name: newCategoryName }
          : category
      )
    );
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
    if (isCategoryNew) {
      setModifiedCategories((prevCategories) => [
        {
          id: getOrCreateCategoryID(prevCategories, inputCategoryName),
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
      handleDialogClose();
      setTimeout(() => {
        resetModalValues();
      }, 250); // Don't immediately reset the values till the closing animation is complete
    } else {
      handleDialogClose();
    }
  };

  //#endregion

  return (
    <Dialog
      open={dialogOpen}
      onClose={handleDialogClose}
      TransitionComponent={Grow}
      closeAfterTransition
    >
      <DialogCard>
        <Titlebar
          action={MODAL_ACTIONS.EDIT}
          title={"Manage Categories"}
          disableRevert={!categoriesChanged}
          onClose={handleBeforeModalClose}
          onRevert={resetModalValues}
        />
        <CategorySearchInput
          categoryName={inputCategoryName}
          setCategoryName={setInputCategoryName}
          categoryExists={!isCategoryNew}
          onCreate={handleCreateCategory}
          sx={{ my: "1rem" }}
        />
        <Stack
          direction={"column"}
          spacing={2}
          py={"1em"}
          px={isMobile ? "0" : "1em"} // Add a small right padding for scrollbar on desktop
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
                <EditableCategoryChip
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
          disabled={
            !categoriesChanged || doCategoryNamesCollide(modifiedCategories)
          }
          onClick={handleSaveCategories}
          sx={{
            border: "1px",
            mt: 2,
            ml: "auto",
          }}
        >
          Save
        </LoadingButton>
      </DialogCard>
    </Dialog>
  );
}
