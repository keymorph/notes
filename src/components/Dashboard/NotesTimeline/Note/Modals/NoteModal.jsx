import { LoadingButton } from "@mui/lab";
import { Card, Grow, Modal, TextField, Typography } from "@mui/material";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { useMutation } from "react-query";
import {
  createNote,
  updateNote,
} from "../../../../../helpers/requests/note-requests";
import { variantFadeSlideUpSlow } from "../../../../../styles/transitions/definitions";
import CategoryChip from "./Category/CategoryChip";
import SearchCategory from "./Category/SearchCategory";

export default function NoteModal({
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
        clearModalValues();
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

  const clearModalValues = () => {
    setNewTitle("");
    setNewDescription("");
    setNewCategoryName("");
    setNewCategoryColor("");
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

  const titleError = newTitle?.trim() === "";

  return (
    <Modal
      open={modalOpen}
      onClose={action === "edit" ? handleEditNote : handleModalClose}
      closeAfterTransition
    >
      <Grow in={modalOpen}>
        <Card
          sx={{
            position: "fixed",
            mt: "25vh",
            mx: "auto",
            p: 2,
            left: 0,
            right: 0,
            display: "flex",
            flexDirection: "column",
            width: "90%",
            minWidth: "200px",
            maxWidth: "400px",
            borderRadius: "10px",
            boxShadow: 24,
          }}
        >
          <Typography variant="h5" color={"primary"}>
            {action === "edit" ? "Edit Note" : "Create a Note"}
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
              style: {
                transition: "all 0.3s ease-in-out",
              },
            }}
            onChange={(event) => setNewTitle(event.target.value.trim())}
          />

          <TextField
            id="outlined-multiline-static"
            label="Description"
            multiline
            rows={4}
            defaultValue={description}
            sx={{ mb: 2 }}
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
            {action === "edit" ? "Save" : "Create"}
          </LoadingButton>
        </Card>
      </Grow>
    </Modal>
  );
}
