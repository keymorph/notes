import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Chip,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import Modal from "@mui/material/Modal";

export default function NoteCreateModal({
  modalOpen,
  handleClose,
  setNoteCollection,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [categoryColor, setCategoryColor] = useState(1);
  const [tags, setTags] = useState("Tag1");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  // Style of the Modal (SHOULD BE CHANGED LATER ON TO FIT MUI-THEME)
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%) scale(.9,.9)",
    width: 300,
    height: 350,
    bgcolor: "background.paper",
    border: "5px solid #000",
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
  };

  const url = "http://localhost:8000/api";
  const token = localStorage.getItem("auth-token");

  const createNote = () => {
    axios
      .post(
        `${url}/note`,
        {
          title: `${title}`,
          description: `${description}`,
          category: {
            name: `${categoryName}`,
            color: `${categoryName ? categoryColor : 0}`,
            note_count: 1, // Number of notes in this category, always 1 when creating a note
          },
          tags: `${tags}`,
        },
        {
          headers: {
            "auth-token": token,
          },
        }
      )
      .then((response) => {
        // Close the Modal.
        handleClose();

        // Empty the modal values.
        setTitle("");
        setDescription("");
        setCategoryName("");
        setTags("");

        // Reflect the database changes on the front-end
        // Add the newly created note to the NoteCollection

        setNoteCollection((oldArray) => [...oldArray, response.noteItem]);
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });
  };

  const fieldsAreEmpty = () => {
    return title.length === 0;
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  /*
    IMPORTANT ------------------------------------------------------------
    ------------------------------------------------------------------------------------------------------------------------

    when we create a note:

    {
        "title" : "Grey Note",
        "description" : "This note should be grey.",
        "category" : "Homework",
        "color" : 5,
        "tags" : "JotFox"
    }
    */

  return (
    <Modal
      open={modalOpen}
      onClose={handleClose}
      onBackdropClick={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography variant="h6">Create a Note:</Typography>

        {/* Note Modal: TITLE Field */}
        <Typography id="modal-modal-title" variant="h6" component="h2">
          <TextField
            required
            id="outlined-required"
            label="Title"
            defaultValue={title}
            onChange={(event) => setTitle(event.target.value)}
            sx={{ width: "100%" }}
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
            onChange={(event) => setDescription(event.target.value)}
            sx={{ width: "100%" }}
          />
        </Typography>

        {/* Note Modal: CATEGORY (Chips) Field */}
        <Typography>
          {/* <Chip
                        sx={{margin: '10px', position: 'absolute'}}
                        label={category}
                        onChange={event => setCategory(event.target.value)}
                    /> */}

          <Menu anchorEl={anchorEl} onClick={handleClick} open>
            <MenuItem>Category 1</MenuItem>
            <MenuItem>Category 2</MenuItem>
          </Menu>
        </Typography>

        <Button
          variant="contained"
          size="small"
          disabled={fieldsAreEmpty()}
          onClick={createNote}
          sx={{
            border: "1px",
            position: "absolute",
            right: "30px",
            bottom: "30px",
          }}
        >
          CREATE
        </Button>
      </Box>
    </Modal>
  );
}
