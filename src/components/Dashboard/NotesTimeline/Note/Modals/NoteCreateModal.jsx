import AddIcon from "@mui/icons-material/Add";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Button,
  Card,
  Grow,
  IconButton,
  Menu,
  MenuItem,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useMutation } from "react-query";

import { createNote } from "../../../../../helpers/requests/note-requests";

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
  const [selectedColor, setSelectedColor] = useState(0);
  const [createdCategory, setCreatedCategory] = useState("");

  // Query Handling
  const { mutate: mutateCreate, status: createStatus } = useMutation(
    createNote,
    {
      onSuccess: ({ data }) => {
        // Close the Modal.
        handleClose();

        // Empty the modal values.
        setTitle("");
        setDescription("");
        setCategoryName("");
        setTags([]);

        // Reflect the database changes on the front-end
        // Add the newly created note to the NoteCollection
        setNoteCollection(data.noteItem.notes);
      },
      onError: (error) => {
        console.error(error.message);
      },
    }
  );

  const handleCreateNote = () => {
    const newNote = {
      title: `${title}`,
      description: `${description}`,
      category: {
        name: `${categoryName}`,
        color: `${categoryName ? categoryColor : 0}`,
      },
      tags: tags,
    };
    mutateCreate(newNote);
  };

  const areFieldsEmpty = () => {
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
            width: "80%",
            borderRadius: "10px",
            boxShadow: 24,
          }}
        >
          <Typography variant="h5" color={"primary"}>
            Create a Note
          </Typography>

          {/* Note Modal: TITLE Field */}
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <TextField
              required
              id="outlined-required"
              label="Title"
              defaultValue={title}
              onChange={(event) => setTitle(event.target.value.trim())}
              sx={{ width: "100%", mt: 2 }}
            />
          </Typography>

          {/* Note Modal: DESCRIPTION Field */}

          <TextField
            id="outlined-multiline-static"
            label="Description"
            multiline
            rows={4}
            defaultValue={description}
            onChange={(event) => setDescription(event.target.value.trim())}
            sx={{ width: "100%", mt: 2, mb: 2 }}
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
          >
            <Box style={{ width: "220px", height: "170px" }}>
              <IconButton
                aria-label="delete"
                size="small"
                sx={{ position: "absolute", right: 2, width: 20, height: 17 }}
                onClick={() => setAnchorEl(null)}
              >
                <CloseIcon sx={{ width: 17, height: 17 }} />
              </IconButton>
              <Box
                sx={{
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
                        key={ctg.name}
                        ctg={ctg}
                        setCategoryName={setCategoryName}
                        getColor={getColor}
                        setAnchorEl={setAnchorEl}
                      />
                    ))}
                </Box>
              ) : (
                <Box
                  style={{
                    borderTop: "1px solid #cdcdcd",
                    borderBottom: "1px solid #cdcdcd",
                    overflow: "auto",
                    height: "110px",
                    marginBottom: 2,
                  }}
                >
                  <Box
                    style={{
                      fontSize: 10,
                      fontWeight: 600,
                      marginLeft: 14,
                      marginBottom: 4,
                      marginTop: 4,
                    }}
                  >
                    Pick Color
                  </Box>
                  <Box
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "80%",
                      marginLeft: 10,
                    }}
                  >
                    {[0, 1, 2, 3, 4].map((color) => (
                      <Box
                        key={color}
                        style={{
                          width: "20px",
                          height: "20px",
                          backgroundColor: getColor(color),
                          borderRadius: 5,
                          margin: 4,
                          border:
                            selectedColor === color
                              ? "1.5px solid red"
                              : `1.5px solid ${getColor(color)}`,
                        }}
                        onClick={() => setSelectedColor(color)}
                      />
                    ))}
                  </Box>

                  <Box style={{ height: 20, fontSize: 12 }}>
                    <TextField
                      id="standard-basic"
                      variant="standard"
                      size="small"
                      label="Category Name"
                      style={{
                        height: "20px !important",
                        marginLeft: 14,
                        marginTop: 4,
                      }}
                      onChange={(event) =>
                        setCreatedCategory(event.target.value)
                      }
                      sx={{ width: "75%" }}
                      InputLabelProps={{
                        style: { fontSize: 10 },
                      }}
                      InputProps={{
                        style: { fontSize: 10 },
                      }}
                    />
                  </Box>
                </Box>
              )}
              <Box
                style={{
                  height: "30px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {!createMode ? (
                  <Button
                    onClick={() => setCreateMode(true)}
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
                ) : (
                  <Box>
                    <Button
                      onClick={() => setCreateMode(false)}
                      style={{
                        height: "26px",
                        fontSize: 10,
                        fontWeight: "bold",
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={() => setCreateMode(false)}
                      style={{
                        height: "26px",
                        fontSize: 10,
                        fontWeight: "bold",
                      }}
                    >
                      Save
                    </Button>
                  </Box>
                )}
              </Box>
            </Box>
          </Menu>

          <Button
            variant="outlined"
            style={{}}
            endIcon={<ArrowDropDownIcon />}
            onClick={handleClick}
          >
            Categories
          </Button>

          <Button
            variant="contained"
            size="small"
            disabled={areFieldsEmpty()}
            onClick={handleCreateNote}
            sx={{
              border: "1px",
              mt: 2,
              ml: "auto",
            }}
          >
            CREATE
          </Button>
        </Card>
      </Grow>
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
          />
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
