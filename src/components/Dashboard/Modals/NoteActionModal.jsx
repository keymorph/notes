import { LoadingButton } from "@mui/lab";
import {
  Card,
  Grow,
  Modal,
  TextField,
  useMediaQuery,
  useTheme,
  Zoom,
} from "@mui/material";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import {
  NOTE_DESCRIPTION_CHAR_LIMIT,
  NOTE_TITLE_CHAR_LIMIT,
} from "../../../constants/input-limits";
import { MODAL_ACTIONS } from "../../../helpers/models/modals";
import {
  createCategoryID,
  doCategoryNamesCollide,
  getOrCreateCategoryID,
} from "../../../helpers/notes/category";
import {
  createNote,
  updateNote,
} from "../../../helpers/requests/note-requests";
import { variantFadeSlideUpSlow } from "../../../styles/animations/definitions";
import { modalCard } from "../../../styles/components/modal";
import EditableCategoryChip from "./Components/EditableCategoryChip";
import SelectOrAddCategory from "./Components/SelectOrAddCategory";
import Titlebar from "./Components/Titlebar";

const DESCRIPTION_ROWS = {
  TINY: 4,
  SMALL: 8,
  MEDIUM: 12,
  LARGE: 16,
  HUGE: 20,
  GIGANTIC: 24,
};

export default function NoteActionModal({
  action,
  noteID,
  title,
  description,
  categoryName,
  categoryColor,
  categoriesCollection,
  setNoteCollection,
  setCategoriesCollection,
  modalOpen,
  handleModalClose,
}) {
  //#region Hooks
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down("380"));

  // Tracks any changes to the current action being performed (edit, create, view, etc)
  const [currentAction, setCurrentAction] = useState(action);

  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
  const [newCategoryName, setNewCategoryName] = useState(categoryName);
  const [newCategoryColor, setNewCategoryColor] = useState(categoryColor);
  const [displayCategoryChip, setDisplayCategoryChip] = useState(
    !!categoryName
  );
  const [isCategoryNew, setIsCategoryNew] = useState(false);

  useEffect(() => {
    setCurrentAction(action);
    setNewTitle(title);
    setNewDescription(description);
    setNewCategoryName(categoryName);
    setNewCategoryColor(categoryColor);
    setDisplayCategoryChip(!!categoryName);
  }, [action, title, description, categoryName, categoryColor]);
  //#endregion

  //#region Query Handling Hooks
  const { mutate: mutateEdit, status: editStatus } = useMutation(updateNote, {
    onSuccess: ({ data }) => {
      // Reflect the database changes on the front-end
      setNoteCollection(data.noteItem.notes.reverse());
      setCategoriesCollection(data.noteItem.categories);
      setIsCategoryNew(false); // Reset the flag. If a new category was created, it is not new anymore
    },
    onError: (error) => {
      console.error(error.message);
    },
  });

  const { mutate: mutateCreate, status: createStatus } = useMutation(
    createNote,
    {
      onSuccess: ({ data }) => {
        handleModalClose();
        // Reflect the database changes on the front-end
        setNoteCollection(data.noteItem.notes.reverse());
        setCategoriesCollection(data.noteItem.categories);
        setTimeout(() => {
          handleResetModalValues(); // Don't immediately reset the values till the closing animation is complete
        }, 500);
      },
      onError: (error) => {
        console.error(error.message);
      },
    }
  );
  //#endregion
  //#endregion

  //#region Helper Functions
  // Reset modal values is used when creating a note
  // If keepCurrentAction is true, it means that we don't want to reset the current action (e.g. when resetting the values)
  const handleResetModalValues = (keepCurrentAction = false) => {
    if (!keepCurrentAction) {
      setCurrentAction(action);
    }
    setNewTitle(title);
    setNewDescription(description);
    setNewCategoryName(categoryName);
    setNewCategoryColor(categoryColor);
    setDisplayCategoryChip(!!categoryName);
    setIsCategoryNew(false);
  };
  //#endregion

  //#region Handlers
  const handleActionChange = (newAction) => {
    setCurrentAction(newAction);
  };

  const handleCreateNote = () => {
    const newNote = {
      title: `${newTitle.trim()}`,
      description: `${newDescription.trim()}`,
      category: {
        id: getOrCreateCategoryID(categoriesCollection, newCategoryName.trim()),
        name: `${newCategoryName.trim()}`,
        color: `${newCategoryColor || "none"}`,
      },
      tags: [],
    };
    mutateCreate(newNote);
  };

  const handleEditNote = () => {
    // If no changes made, no database request necessary
    if (valuesChanged) {
      const editedNote = {
        noteID: Number(noteID),
        title: `${newTitle.trim()}`,
        description: `${newDescription.trim()}`,
        category: {
          id: getOrCreateCategoryID(
            categoriesCollection,
            newCategoryName.trim()
          ),
          name: displayCategoryChip ? `${newCategoryName.trim()}` : "", // Ensure we don't send the temporary category name
          color: `${newCategoryColor}`,
        },
        tags: [],
      };
      mutateEdit(editedNote);
    }
    handleModalClose();
  };

  const handleCategoryChipDelete = () => {
    setNewCategoryName("");
    setNewCategoryColor("none");
    setDisplayCategoryChip(false);
    setIsCategoryNew(false);
  };

  const handleBeforeModalClose = (event, reason) => {
    if (reason === "closeModal" || !valuesChanged) {
      handleModalClose();
      setTimeout(() => {
        handleResetModalValues();
      }, 500); // Don't immediately reset the values till the closing animation is complete
    } else {
      if (currentAction === MODAL_ACTIONS.EDIT) {
        handleEditNote();
      } else if (currentAction === MODAL_ACTIONS.CREATE_NOTE) {
        handleModalClose();
      }
    }
  };
  //#endregion

  //#region Derived State Variables
  // Short variable names for the current action being performed
  const isViewing = currentAction === MODAL_ACTIONS.VIEW;
  const isEditing = currentAction === MODAL_ACTIONS.EDIT;
  const isCreating = currentAction === MODAL_ACTIONS.CREATE_NOTE;
  // Description textarea row count
  let maxDescriptionRows = DESCRIPTION_ROWS.HUGE;
  let minDescriptionRows = DESCRIPTION_ROWS.TINY;
  if (isSmallMobile) {
    maxDescriptionRows = isViewing
      ? DESCRIPTION_ROWS.MEDIUM
      : DESCRIPTION_ROWS.SMALL;
  } else if (isMobile) {
    maxDescriptionRows = isViewing
      ? DESCRIPTION_ROWS.LARGE
      : DESCRIPTION_ROWS.MEDIUM;
  } else {
    minDescriptionRows = DESCRIPTION_ROWS.SMALL;
    maxDescriptionRows = isViewing
      ? DESCRIPTION_ROWS.HUGE
      : DESCRIPTION_ROWS.LARGE;
  }
  // modified categories collection with the new category
  let modifiedCategoriesCollection = [...categoriesCollection];
  if (isCategoryNew) {
    modifiedCategoriesCollection = [
      ...modifiedCategoriesCollection,
      {
        id: createCategoryID(categoriesCollection),
        name: newCategoryName,
        color: newCategoryColor,
      },
    ];
  }
  // Input validation
  const titleError = newTitle.trim() === "";
  const valuesChanged =
    newTitle.trim() !== title ||
    newDescription.trim() !== description ||
    newCategoryName.trim() !== categoryName ||
    newCategoryColor !== categoryColor;
  const saveDisabled =
    titleError ||
    !valuesChanged ||
    doCategoryNamesCollide(modifiedCategoriesCollection);
  //#endregion

  return (
    <Modal
      open={modalOpen}
      onClose={(event, reason) => handleBeforeModalClose(event, reason)}
      closeAfterTransition
    >
      <Grow in={modalOpen}>
        <Card sx={modalCard}>
          <Titlebar
            action={currentAction}
            title={
              (isViewing && "Viewing Note") ||
              (isEditing && "Editing Note") ||
              (isCreating && "Creating a Note")
            }
            disableRevert={!valuesChanged}
            onClose={handleBeforeModalClose}
            onActionChange={handleActionChange}
            onRevert={handleResetModalValues}
          />

          <TextField
            disabled={currentAction === MODAL_ACTIONS.VIEW}
            required
            id="outlined-required"
            label={"Title"}
            value={newTitle}
            sx={{ my: "1em" }}
            inputProps={{
              maxLength: NOTE_TITLE_CHAR_LIMIT,
            }}
            onChange={(event) => setNewTitle(event.target.value)}
          />

          <TextField
            disabled={currentAction === MODAL_ACTIONS.VIEW}
            id="outlined-multiline-static"
            label={"Description"}
            value={newDescription}
            multiline
            minRows={minDescriptionRows}
            maxRows={maxDescriptionRows}
            sx={{ mb: 2 }}
            inputProps={{ maxLength: NOTE_DESCRIPTION_CHAR_LIMIT }}
            onChange={(event) => setNewDescription(event.target.value)}
          />

          {/* Display either the category chip or the search category component based on the user intended action */}
          {displayCategoryChip && (
            <motion.div
              variants={variantFadeSlideUpSlow}
              initial={"hidden"}
              animate={"visible"}
            >
              <EditableCategoryChip
                categoryName={newCategoryName}
                categoryColor={newCategoryColor}
                setCategoryName={setNewCategoryName}
                setCategoryColor={setNewCategoryColor}
                categoryCollection={modifiedCategoriesCollection}
                enableEdit={isCategoryNew} // Enable edit if category is new
                onDelete={
                  currentAction !== MODAL_ACTIONS.VIEW
                    ? handleCategoryChipDelete
                    : null
                }
              />
            </motion.div>
          )}
          {!displayCategoryChip && (isCreating || isEditing) && (
            <motion.div
              variants={variantFadeSlideUpSlow}
              initial={"hidden"}
              animate={"visible"}
            >
              <SelectOrAddCategory
                categoriesCollection={categoriesCollection}
                categoryName={newCategoryName}
                setCategoryName={setNewCategoryName}
                setCategoryColor={setNewCategoryColor}
                setIsCategoryNew={setIsCategoryNew}
                setDisplayCategoryChip={setDisplayCategoryChip}
              />
            </motion.div>
          )}

          <Zoom in={isCreating || isEditing} unmountOnExit>
            <LoadingButton
              loading={editStatus === "loading" || createStatus === "loading"}
              variant="contained"
              size="small"
              disabled={saveDisabled} // Disable button if required title field is empty
              onClick={isEditing ? handleEditNote : handleCreateNote}
              sx={{
                border: "1px",
                mt: 2,
                ml: "auto",
              }}
            >
              {isEditing && "Save"}
              {isCreating && "Create"}
            </LoadingButton>
          </Zoom>
        </Card>
      </Grow>
    </Modal>
  );
}
