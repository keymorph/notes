import { DragHandle, MoreHoriz } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { useRef, useState } from "react";
import { useMutation } from "react-query";

import {
  createNote,
  deleteNote,
} from "../../../../helpers/requests/note-requests";
import NoteEditModal from "./NoteEditModal";

export default function Note({
  noteID,
  index,
  title: initialTitle,
  description: initialDescription,
  categoryName: initialCategoryName,
  tags,
  color,
  noteCollection,
  setNoteCollection,
  categories,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState(initialTitle);
  const [categoryName, setCategoryName] = useState(initialCategoryName);
  const [description, setDescription] = useState(initialDescription);

  const menuOpen = Boolean(anchorEl);

  // Query Handling
  const { mutate: mutateDelete, status: deleteStatus } = useMutation(
    deleteNote,
    {
      onSuccess: ({ data }) => {
        console.log(index);
        setAnchorEl(null);
        setNoteCollection(
          noteCollection.filter((note, index) => {
            return index !== index;
          })
        );
      },
      onError: (error) => {
        console.error(error.message);
      },
    }
  );
  const { mutate: mutateDuplicate, status: duplicateStatus } = useMutation(
    createNote,
    {
      onSuccess: ({ data }) => {
        setAnchorEl(null);
        // Reflect the database changes on the front-end by adding the newly created note to the NoteCollection
        setNoteCollection((oldArray) => [...oldArray, data.note]);
      },
      onError: (error) => {
        console.error(error.message);
      },
    }
  );

  // Modal Handlers
  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
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

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDelete = () => {
    mutateDelete({
      noteID: noteID,
    });
  };

  const handleCreateDuplicate = () => {
    const duplicateNote = {
      title: title,
      description: description,
      category: {
        name: categoryName,
        color: color,
        note_count: 1, // Number of notes in this category, always 1 when creating a note
      },
      tags: tags,
    };
    mutateDuplicate(duplicateNote);
  };

  const categoryExists = () => {
    return categoryName !== "";
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
    <Box
      sx={{
        display: "flex",
      }}
    >
      <NoteEditModal
        noteID={noteID}
        title={title}
        description={description}
        categoryName={categoryName}
        categoryColor={color}
        tags={tags}
        setTitle={setTitle}
        setDescription={setDescription}
        setCategoryName={setCategoryName}
        categories={categories}
        modalOpen={modalOpen}
        handleClose={handleModalClose}
        handleChipDelete={handleChipDelete}
      />

      <Card
        sx={{
          width: "300px",
          minHeight: "300px",
          maxHeight: "400px",
          overflowWrap: "break-word",
          margin: "5px",
        }}
        ref={ref}
      >
        <Box
          sx={{
            backgroundColor: categoryColorValue(color),
            display: "flex",
            position: "relative",
          }}
        >
          {categoryExists() ? (
            <Chip label={categoryName} sx={{ m: 0.5, height: "2em" }} />
          ) : null}

          <Box
            aria-label="Drag note handle"
            sx={{
              touchAction: "none", // Prevent scrolling while dragging on mobile devices
              position: "absolute",
              px: "4em",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              opacity: "0.5",
              transition: "opacity 0.2s ease-in-out",
              "&:hover": {
                cursor: "grab",
                opacity: "1",
                transition: "opacity 0.2s ease-in-out",
              },
              "&:active": {
                cursor: "grabbing",
              },
            }}
          >
            <DragHandle />
          </Box>
          <IconButton
            aria-label="Note settings"
            sx={{ m: 0.5, ml: "auto", height: "1em" }}
            onClick={handleClick}
          >
            <MoreHoriz />
          </IconButton>
        </Box>

        <Menu
          anchorEl={anchorEl}
          open={menuOpen}
          onClose={() => setAnchorEl(null)}
          style={{ opacity: modalOpen ? 0 : 1 }}
        >
          <MenuItem onClick={handleModalOpen}>Edit</MenuItem>
          <MenuItem onClick={handleCreateDuplicate}>Duplicate</MenuItem>
          <MenuItem onClick={handleDelete}>Delete</MenuItem>
        </Menu>

        <CardContent
          onClick={handleModalOpen}
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
  );
}
