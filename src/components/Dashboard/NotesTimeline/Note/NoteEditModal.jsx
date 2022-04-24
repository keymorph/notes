import { Card, Chip, Grow, Modal, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useMutation } from "react-query";
import { updateNote } from "../../../../helpers/requests/note-requests";

export default function NoteEditModal({
  modalOpen,
  handleClose,
  categoryName,
  tags,
  description,
  title,
  handleChipDelete,
  setTitle,
  setDescription,
  noteID,
}) {
  const [categoryColor, setCategoryColor] = useState(1);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDescription, setEditedDescription] = useState(description);

  // Query Handling
  const { mutate: mutateEdit, status: editStatus } = useMutation(updateNote, {
    onSuccess: () => {
      // TODO: Add Category and Tags checks once those are implemented
      // Set the newly edited title and description after the request is successful
      setTitle(editedTitle);
      setDescription(editedDescription);
    },
    onError: (error) => {
      console.error(error.message);
    },
  });

  const handleNoteEdit = () => {
    // If no changes made, no request necessary
    if (editedTitle !== title || editedDescription !== description) {
      const editedNote = {
        noteID: noteID,
        title: `${editedTitle}`,
        description: `${editedDescription}`,
        category: {
          name: `${categoryName}`,
          color: `${categoryColor}`,
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
            width: "80%",
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
            error={editedTitle.trim() === ""}
            sx={{ mt: 2, mb: 2 }}
            onChange={(event) => setEditedTitle(event.target.value.trim())}
          />

          <TextField
            id="outlined-multiline-static"
            label="Description"
            multiline
            rows={4}
            defaultValue={description}
            sx={{ mb: 2 }}
            onChange={(event) =>
              setEditedDescription(event.target.value.trim())
            }
          />

          {/* Note Modal: CATEGORY (Chips) Field */}

          <Chip label={categoryName} onDelete={handleChipDelete} />
        </Card>
      </Grow>
    </Modal>
  );
}
