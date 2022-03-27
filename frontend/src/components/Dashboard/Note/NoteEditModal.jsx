import React, { useState } from "react";
import axios from "axios";
import { Box, Chip, TextField, Typography } from "@mui/material";
import Modal from "@mui/material/Modal";
import Note from "./Note";

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
    console.log(noteID);
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

    handleClose();
  };

  // Style of the Modal (SHOULD BE CHANGED LATER ON TO FIT MUI-THEME)
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal
      open={modalOpen}
      onClose={saveModalData}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography variant="h5">EDIT NOTE:</Typography>

        {/* Note Modal: TITLE Field */}
        <Typography id="modal-modal-title" variant="h6" component="h2">
          <TextField
            required
            id="outlined-required"
            label="Title"
            defaultValue={title}
            onChange={(event) => setEditedTitle(event.target.value)}
          />
        </Typography>

        {/* Note Modal: DESCRIPTION Field */}
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <TextField
            id="outlined-multiline-static"
            label="Description"
            multiline
            rows={4}
            defaultValue={description}
            onChange={(event) => setEditedDescription(event.target.value)}
          />
        </Typography>

        {/* Note Modal: CATEGORY (Chips) Field */}
        <Typography>
          <Chip label={categoryName} onDelete={handleChipDelete} />
        </Typography>
      </Box>
    </Modal>
  );
}
