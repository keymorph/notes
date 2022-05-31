import { Card, Chip, Grow, Modal, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useMutation } from "react-query";
import { updateNote } from "../../../../../helpers/requests/note-requests";

export default function NoteModal({
  noteID,
  title,
  description,
  categoryName,
  categoryColor,
  setTitle,
  setDescription,
  setCategoryName,
  setCategoryColor,
  modalOpen,
  handleClose,
}) {
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
  const [newCategoryName, setNewCategoryName] = useState(categoryName);
  const [newCategoryColor, setNewCategoryColor] = useState(categoryColor);

  // Query Handling
  const { mutate: mutateEdit, status: editStatus } = useMutation(updateNote, {
    onSuccess: () => {
      // Set the newly edited note data to the global note state
      setTitle(newTitle);
      setDescription(newDescription);
      setCategoryName(newCategoryName);
      setCategoryColor(newCategoryColor);
    },
    onError: (error) => {
      console.error(error.message);
    },
  });

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
        tags: tags,
      };
      mutateEdit(editedNote);
    }
    handleClose();
  };

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
            Edit Note
          </Typography>

          {/* Note Modal: TITLE Field */}

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

          <Chip label={categoryName} />
        </Card>
      </Grow>
    </Modal>
  );
}
