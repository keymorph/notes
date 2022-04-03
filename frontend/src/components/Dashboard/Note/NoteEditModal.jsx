import React, { useState } from "react";
import axios from "axios";
import { Chip, TextField, Typography, Card, Grow, Modal } from "@mui/material";

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

  // TODO: Add Category and Tags checks once those are implemented
  const saveModalData = () => {
    // If no changes made, no request necessary
    if (editedTitle !== title || editedDescription !== description) {
      axios
        .put(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/note`,
          {
            noteID: noteID,
            title: `${editedTitle}`,
            description: `${editedDescription}`,
            category: {
              name: `${categoryName}`,
              color: `${categoryColor}`,
            },
            tags: tags,
          },

          {
            headers: {
              "auth-token": localStorage.getItem("auth-token"),
            },
          }
        )
        .then(() => {
          // Set the newly edited title and description after the request is successful
          setTitle(editedTitle);
          setDescription(editedDescription);
        })
        .catch((error) => {
          console.error(`Error: ${error}`);
        });
    }

    handleClose();
  };

  return (
    <Modal
      open={modalOpen}
      onClose={saveModalData}
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
            autoFocus
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
          <Typography>
            <Chip label={categoryName} onDelete={handleChipDelete} />
          </Typography>
        </Card>
      </Grow>
    </Modal>
  );
}
