import React, { useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import {
  Box,
  Button,
  Chip,
  Card,
  Menu,
  MenuItem,
  TextField,
  Typography,
  InputLabel,
  IconButton,
  Select,
  FormControl,
  FormHelperText,
} from "@mui/material";
import Modal from "@mui/material/Modal";

export default function NoteCreateModal({
  modalOpen,
  handleClose,
  setNoteCollection,
  categories,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [categoryColor, setCategoryColor] = useState(1);
  const [tags, setTags] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [createMode, setCreateMode] = useState(false);

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
        // Close the Modal.
        handleClose();

        // Empty the modal values.
        setTitle("");
        setDescription("");
        setCategoryName("");
        setTags([]);

        // Reflect the database changes on the front-end
        // Add the newly created note to the NoteCollection
        console.log(response);

        setNoteCollection((oldArray) => [...oldArray, response.data.note]);
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

  const getColor = (color) => {
    switch (color) {
      case 0: {
        // Red
        return "#999999";
      }
      case 1: {
        // Red
        return "#A26361";
      }
      case 2: {
        // Yellow
        return "#DEBB97";
      }
      case 3: {
        // Green
        return "#B4B387";
      }
      case 4: {
        // Blue
        return "#7789AB";
      }
      default: {
        return "#999999";
      }
    }
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

        <TextField
          id="outlined-multiline-static"
          label="Description"
          multiline
          rows={4}
          defaultValue={description}
          onChange={(event) => setDescription(event.target.value)}
          sx={{ width: "100%", mt: 2 }}
        />

        {/* Note Modal: CATEGORY (Chips) Field */}

        {/* <Chip
                        sx={{margin: '10px', position: 'absolute'}}
                        label={category}
                        onChange={event => setCategory(event.target.value)}
                    /> */}

        <Menu
          anchorEl={anchorEl}
          onClose={() => setAnchorEl(null)}
          open={anchorEl}
          style={{ margin: 0, padding: 0 }}
        >
          <Box style={{ width: "220px", height: "170px" }}>
            <IconButton
              aria-label="delete"
              size="small"
              style={{ position: "absolute", right: 2, width: 17, height: 17 }}
              onClick={() => setAnchorEl(null)}
            >
              <CloseIcon style={{ width: 17, height: 17 }} />
            </IconButton>
            <Box
              style={{
                height: "30px",
                fontSize: 12,
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              Categories
            </Box>
            {!createMode ? (
              <Box
                style={{
                  borderTop: "1px solid #cdcdcd",
                  borderBottom: "1px solid #cdcdcd",
                  overflow: "auto",
                  height: "110px",
                  marginBottom: 2,
                }}
              >
                {categories
                  .filter((ctg) => ctg.name !== "")
                  .map((ctg) => (
                    <CategoryItem
                      ctg={ctg}
                      setCategoryName={setCategoryName}
                      getColor={getColor}
                      setAnchorEl={setAnchorEl}
                    />
                  ))}
              </Box>
            ) : 
              <Box
                style={{
                  borderTop: "1px solid #cdcdcd",
                  borderBottom: "1px solid #cdcdcd",
                  overflow: "auto",
                  height: "110px",
                  marginBottom: 2,
                }}
              >
                <Box></Box>
                <Box></Box>
                <Box></Box>
                <Box></Box>

              </Box>
            }
            <Box
              style={{
                height: "30px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                onClick={()=>setCreateMode(true)}
                style={{ height: "26px", fontSize: 10, fontWeight: "bold" }}
                endIcon={
                  <AddIcon
                    style={{
                      width: 12,
                      height: 12,
                      position: "relative",
                      bottom: 2,
                    }}
                  />
                }
              >
                Create Category
              </Button>
            </Box>
          </Box>
        </Menu>

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

        <Button
          variant="outlined"
          style={{}}
          endIcon={<ArrowDropDownIcon />}
          onClick={handleClick}
        >
          Categories
        </Button>
      </Box>
    </Modal>
  );
}

function CategoryItem({ ctg, setCategoryName, getColor, setAnchorEl }) {
  const [hover, setHover] = useState(false);

  return (
    <div style={{ position: "relative" }}>
      <MenuItem value={ctg.name} onClick={() => setCategoryName(ctg.name)}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            fontSize: 12,
            width: "100%",
            opacity: hover ? 1 : 0.7,
          }}
          onMouseEnter={() => setHover(true)}
          onMouseOut={() => setHover(false)}
        >
          <Box
            sx={{
              width: "10px",
              height: "10px",
              backgroundColor: getColor(ctg.color),
              borderRadius: 0.5,
              marginRight: 2,
            }}
          ></Box>
          {ctg.name}
        </Box>

        <EditIcon
          style={{
            position: "absolute",
            right: 5,
            width: 13,
            height: 13,
            opacity: 0.5,
          }}
        />
      </MenuItem>
    </div>
  );
}

// <CategoryItem ctg={ctg} setCategoryName={setCategoryName} getColor={getColor} setAnchorEl={setAnchorEl}>
