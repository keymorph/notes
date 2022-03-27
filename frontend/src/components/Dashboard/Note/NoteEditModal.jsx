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
  const url = "http://localhost:8000/api";
  const token = localStorage.getItem("auth-token");
  const [categoryColor, setCategoryColor] = useState(1);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDescription, setEditedDescription] = useState(description);

  const saveModalData = () => {
    // If no changes made, no request necessary
    // TODO: Add Category and Tags checks once those are implemented
    if (editedTitle !== title || editedDescription !== description) {
      axios
        .put(
          `${url}/note`,
          {
            noteID: noteID,
            title: `${title}`,
            description: `${description}`,
            category: {
              name: `${categoryName}`,
              color: `${categoryColor}`,
            },
            tags: tags,
          },

          {
            headers: {
              "auth-token": token,
            },
          }
        )
        .then((response) => {
          console.log(response);
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
            onChange={(event) => setEditedTitle(event.target.value)}
          />

          <TextField
            id="outlined-multiline-static"
            label="Description"
            multiline
            rows={4}
            defaultValue={description}
            sx={{ mb: 2 }}
            onChange={(event) => setEditedDescription(event.target.value)}
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
