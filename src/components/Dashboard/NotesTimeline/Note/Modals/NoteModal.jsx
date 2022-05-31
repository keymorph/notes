import { LoadingButton } from "@mui/lab";
import { Card, Grow, Modal, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useMutation } from "react-query";
import {
  createNote,
  updateNote,
} from "../../../../../helpers/requests/note-requests";
import CategoryChip from "../../../../Misc/Chips/CategoryChip";

export default function NoteModal({
  noteID,
  title,
  description,
  categoryName,
  categoryColor,
  categories,
  setNoteCollection,
  setCategories,
  action,
  modalOpen,
  handleModalClose,
}) {
  //#region Hooks
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
  const [newCategoryName, setNewCategoryName] = useState(categoryName);
  const [newCategoryColor, setNewCategoryColor] = useState(categoryColor);

  //#region Query Handling Hooks
  const { mutate: mutateEdit, status: editStatus } = useMutation(updateNote, {
    onSuccess: ({ data }) => {
      // Reflect the database changes on the front-end
      setCategories(data.noteItem.categories);
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
        setCategories(data.noteItem.categories);
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
      title: `${title}`,
      description: `${description}`,
      category: {
        name: `${categoryName}`,
        color: `${categoryName ? categoryColor : 0}`,
      },
      tags: [],
    };
    mutateCreate(newNote);
  };

  const handleNoteEdit = () => {
    // If no changes made, no request necessary
    if (newTitle !== title || newDescription !== description) {
      const editedNote = {
        noteID: noteID,
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

  const handleCategoryColorPopperOpen = null;

  return (
    <Modal
      open={modalOpen}
      onClose={handleNoteEdit}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Grow in={modalOpen}>
        <Card
          sx={{
            position: "fixed",
            mt: "30vh",
            mx: "auto",
            p: 4,
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
            error={newTitle.trim() === ""}
            sx={{ mt: 2, mb: 2 }}
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

          {/* If a note is in a category, display the category color and name */}
          {categoryName ? (
            <CategoryChip
              label={categoryName}
              categoryName={newCategoryName}
              categoryColor={newCategoryColor}
              setCategoryName={setNewCategoryName}
              setCategoryColor={setNewCategoryColor}
              onClick={handleCategoryColorPopperOpen}
              onDelete={() => setNewCategoryName("")}
            />
          ) : null}

          <LoadingButton
            loading={editStatus === "loading" || createStatus === "loading"}
            variant="contained"
            size="small"
            disabled={newTitle.trim() === ""} // Disable button if required title field is empty
            onClick={action === "edit" ? handleNoteEdit : handleNoteCreate}
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
