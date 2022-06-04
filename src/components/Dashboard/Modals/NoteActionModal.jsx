import { LoadingButton } from "@mui/lab";
import {
  Card,
  Grow,
  Modal,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { useMutation } from "react-query";
import {
  createNote,
  updateNote,
} from "../../../helpers/requests/note-requests";
import { modalCard } from "../../../styles/components/modals/modal";
import { variantFadeSlideUpSlow } from "../../../styles/transitions/definitions";
import CategoryChip from "./Category/CategoryChip";
import SearchCategory from "./Category/SearchCategory";

const NOTE_TITLE_CHAR_LIMIT = 100;
const NOTE_DESCRIPTION_CHAR_LIMIT = 1000;

export default function NoteActionModal({
  noteID,
  title,
  description,
  categoryName,
  categoryColor,
  categoriesCollection,
  setNoteCollection,
  setCategoriesCollection,
  action,
  modalOpen,
  handleModalClose,
}) {
  //#region Hooks
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [newTitle, setNewTitle] = useState(title); // Cannot make it a string because we use the null value to check if the user has typed anything
  const [newDescription, setNewDescription] = useState(description || "");
  const [newCategoryName, setNewCategoryName] = useState(categoryName || "");
  const [newCategoryColor, setNewCategoryColor] = useState(
    categoryColor || "none"
  );
  const [displayCategoryChip, setDisplayCategoryChip] = useState(
    !!categoryName
  );
  const [isCategoryNew, setIsCategoryNew] = useState(false);
  //#endregion

  const titleError = newTitle?.trim() === "";

  //#region Query Handling Hooks
  const { mutate: mutateEdit, status: editStatus } = useMutation(updateNote, {
    onSuccess: ({ data }) => {
      // Reflect the database changes on the front-end
      setCategoriesCollection(data.noteItem.categories);
      setNoteCollection(data.noteItem.notes.reverse());
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
        setCategoriesCollection(data.noteItem.categories);
        setNoteCollection(data.noteItem.notes.reverse());
      },
      onError: (error) => {
        console.error(error.message);
      },
    }
  );
  //#endregion
  //#endregion

  //#region Helper Functions
  const resetModalValues = () => {
    setNewTitle(title);
    setNewDescription(description);
    setNewCategoryName(categoryName);
    setNewCategoryColor(categoryColor);
    setDisplayCategoryChip(!!categoryName);
    setIsCategoryNew(false);
  };
  //#endregion

  //#region Handlers
  const handleCreateNote = () => {
    const newNote = {
      title: `${newTitle}`,
      description: `${newDescription}`,
      category: {
        name: `${newCategoryName}`,
        color: `${newCategoryColor || "none"}`,
      },
      tags: [],
    };
    mutateCreate(newNote);
  };

  const handleEditNote = () => {
    // If no changes made, no database request necessary
    if (
      newTitle !== title ||
      newDescription !== description ||
      newCategoryName !== categoryName ||
      newCategoryColor !== categoryColor
    ) {
      const editedNote = {
        noteID: Number(noteID),
        title: `${newTitle}`,
        description: `${newDescription}`,
        category: {
          name: `${newCategoryName}`,
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
  };

  const handleBeforeModalClose = (event, reason) => {
    if (action === "edit") {
      handleEditNote();
    } else if (action === "create") {
      handleModalClose();
    }
  };
  //#endregion

  console.log(isMobile);
  return (
    <Modal
      open={modalOpen}
      onClose={(event, reason) => handleBeforeModalClose(event, reason)}
      closeAfterTransition
    >
      <Grow in={modalOpen}>
        <Card sx={modalCard}>
          <Typography variant="h5" color={"primary"}>
            {action === "edit" && "Edit Note"}
            {action === "create" && "Create a Note"}
          </Typography>

          <TextField
            required
            id="outlined-required"
            label="Title"
            defaultValue={title}
            error={titleError}
            helperText={titleError && "Please enter a title"}
            sx={{ mt: 2, mb: 2 }}
            inputProps={{
              maxLength: NOTE_TITLE_CHAR_LIMIT,
            }}
            onChange={(event) => setNewTitle(event.target.value.trim())}
          />

          <TextField
            id="outlined-multiline-static"
            label="Description"
            multiline
            rows={isMobile ? 6 : 8}
            defaultValue={description}
            sx={{ mb: 2 }}
            inputProps={{ maxLength: NOTE_DESCRIPTION_CHAR_LIMIT }}
            onChange={(event) => setNewDescription(event.target.value.trim())}
          />

          {/* Display either the category chip or the search category component based on the user intended action */}
          {displayCategoryChip ? (
            <motion.div
              variants={variantFadeSlideUpSlow}
              initial={"hidden"}
              animate={"visible"}
              exit={"hidden"}
            >
              <CategoryChip
                categoryName={newCategoryName}
                categoryColor={newCategoryColor}
                setCategoryName={setNewCategoryName}
                setCategoryColor={setNewCategoryColor}
                onDelete={handleCategoryChipDelete}
                enableEditColor={isCategoryNew} // Enable edit if category is new
              />
            </motion.div>
          ) : (
            <SearchCategory
              categoriesCollection={categoriesCollection}
              categoryName={newCategoryName}
              setCategoryName={setNewCategoryName}
              setCategoryColor={setNewCategoryColor}
              setIsCategoryNew={setIsCategoryNew}
              setDisplayCategoryChip={setDisplayCategoryChip}
            />
          )}
          <LoadingButton
            loading={editStatus === "loading" || createStatus === "loading"}
            variant="contained"
            size="small"
            disabled={!newTitle || titleError} // Disable button if required title field is empty
            onClick={action === "edit" ? handleEditNote : handleCreateNote}
            sx={{
              border: "1px",
              mt: 2,
              ml: "auto",
            }}
          >
            {action === "edit" && "Save"}
            {action === "create" && "Create"}
          </LoadingButton>
        </Card>
      </Grow>
    </Modal>
  );
}
