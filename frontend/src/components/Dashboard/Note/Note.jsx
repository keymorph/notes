import { useState, useRef, useEffect } from "react";
import editIcon from "../../../images/edit-icon.svg";
import axios from "axios";
import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  IconButton,
  Grid,
  Menu,
  MenuItem,
  Typography,
  Grow,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { DeleteIcon, EditIcon, MoreHoriz, Square } from "@mui/icons-material";
import Modal from "@mui/material/Modal";

// Turn the Note grey, when the Modal is active.
import NoteSkeleton from "./NoteSkeleton";
// Trigger the Modal when editing a Note
import NoteEditModal from "./NoteEditModal";

function Note(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [cardHeight, setCardHeight] = useState("auto");
  const [flip, setFlip] = useState("rotate(0deg)");
  const [contentHeight, setContentHeight] = useState("");
  const [checked, setChecked] = useState(false);
  const [title, setTitle] = useState(props.title);
  const [categoryName, setCategoryName] = useState(props.categoryName);
  const [description, setDescription] = useState(props.description);

  // MODAL
  const [modalOpen, setModalOpen] = useState(false);
  const handleOpen = () => setModalOpen(true);
  const handleClose = () => {
    setModalOpen(false);
    setAnchorEl(null);
  };

  // MODAL: Category (Chip)
  const [chipCategory, deleteChip] = useState(false);
  // Delete the category for the note, and update the database.
  const handleChipDelete = () => {
    deleteChip(true);
  };

  const ref = useRef(null);

  useEffect(() => {
    setCardHeight(ref.current.clientHeight);
  }, [description, title]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const url = "http://localhost:8000/api";
  const token = localStorage.getItem("auth-token");

  const handleDelete = () => {
    axios
      .delete(`${url}/note`, {
        headers: {
          "auth-token": token,
        },
        data: {
          noteID: props.noteID,
        },
      })
      .then((response) => {
        console.log(props.index);
        setAnchorEl(null);
        props.setNoteCollection(
          props.noteCollection.filter((note, index) => {
            // [1, 2, 3, 4, 5, 6, 7] --->  5
            console.log(index !== props.index);
            return index !== props.index;
          })
        );

        console.log(response);
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });
  };

  const handleCreateDuplicate = () => {
    axios
      .post(
        `${url}/note`,
        {
          title: props.title,
          description: props.description,
          category: {
            name: props.categoryName,
            color: props.color,
            note_count: 1, // Number of notes in this category, always 1 when creating a note
          },
          tags: props.tags,
        },
        {
          headers: {
            "auth-token": token,
          },
        }
      )
      .then(({ data }) => {
        setAnchorEl(null);

        // Reflect the database changes on the front-end
        // Add the newly created note to the NoteCollection
        props.setNoteCollection((oldArray) => [...oldArray, data.note]);
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });
  };

  const categoryExists = () => {
    return props.categoryName !== "";
  };

  const categoryColorValue = (colorNumber) => {
    if (categoryExists()) {
      switch (colorNumber) {
        case "0": {
          // Grey
          return "#999999A0";
        }
        case "1": {
          // Red
          return "#af0500A0";
        }
        case "2": {
          // Yellow
          return "#da6e00A0";
        }
        case "3": {
          // Green
          return "#b2b100A0";
        }
        case "4": {
          // Blue
          return "#7789ABA0";
        }
        default: {
          return "#999999A0";
        }
      }
    } else {
      // There is no category, so return Grey
      return "#999999A0";
    }
  };

  return (
    <Grow in>
      <Box sx={{ display: "flex" }}>
        <NoteEditModal
          noteID={props.noteID}
          title={title}
          description={description}
          categoryName={categoryName}
          categoryColor={props.color}
          tags={props.tags}
          setTitle={setTitle}
          setDescription={setDescription}
          setCategoryName={setCategoryName}
          categories={props.categories}
          modalOpen={modalOpen}
          handleClose={handleClose}
          handleChipDelete={handleChipDelete}
        />

        <Card
          className="NoteCard"
          sx={{
            width: "300px",
            minHeight: "300px",
            maxHeight: "400px",
            overflowWrap: "break-word",
            margin: "5px",
            transition: "transform 0.2s ease-in-out !important",
            "&:hover": {
              transform: "scale(1.02)",
              transition: "transform 0.1s ease-in-out !important",
            },
          }}
          ref={ref}
        >
          <Box
            style={{
              backgroundColor: categoryColorValue(props.color),
              display: "flex",
              position: "relative",
            }}
          >
            {categoryExists() ? (
              <Chip label={props.categoryName} sx={{ m: 0.5, height: "2em" }} />
            ) : null}

            <IconButton
              aria-label="settings"
              sx={{ m: 0.5, ml: "auto", height: "1em" }}
              onClick={handleClick}
            >
              <MoreHoriz />
            </IconButton>
          </Box>

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={() => setAnchorEl(null)}
            style={{ opacity: modalOpen ? 0 : 1 }}
          >
            <MenuItem onClick={handleOpen}>Edit</MenuItem>
            <MenuItem onClick={handleCreateDuplicate}>Duplicate</MenuItem>
            <MenuItem onClick={handleDelete}>Delete</MenuItem>
          </Menu>

          <CardContent
            onClick={handleOpen}
            sx={{
              userSelect: "text",
              height: "100%",
              cursor: "pointer",
              py: 0.5,
              px: 1,
            }}
          >
            <Typography variant="body1" title="Title Name" noWrap>
              {title}
            </Typography>

            <Divider />

            <Typography variant="body2">{description}</Typography>
          </CardContent>
        </Card>
      </Box>
    </Grow>
  );
}

export default Note;
