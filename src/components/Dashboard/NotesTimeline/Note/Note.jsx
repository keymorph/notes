import { MoreHoriz } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  styled,
  Typography,
} from "@mui/material";
import { useRef, useState } from "react";
import { useMutation } from "react-query";

import {
  createNote,
  deleteNote,
} from "../../../../helpers/requests/note-requests";
import NoteEditModal from "./Modals/NoteEditModal";

const NoteCard = styled(Card)({
  touchAction: "none", // Disable browser handling of all touch panning and zooming gestures
  width: "300px",
  minHeight: "300px",
  maxHeight: "400px",
  overflowWrap: "break-word",
  margin: "5px",
  transition: "opacity 0.2s ease-in-out",
});

export default function Note({
  noteID,
  title: initialTitle,
  description: initialDescription,
  categoryName: initialCategoryName,
  tags,
  color,
  noteCollection,
  setNoteCollection,
  categories,
  dragHandleListeners,
  dragHandleAttributes,
}) {
  //#region Hooks

  const [anchorEl, setAnchorEl] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState(initialTitle);
  const [categoryName, setCategoryName] = useState(initialCategoryName);
  const [description, setDescription] = useState(initialDescription);

  //#endregion

  const menuOpen = Boolean(anchorEl);

  //#region Query Handling
  const { mutate: mutateDelete, status: deleteStatus } = useMutation(
    deleteNote,
    {
      onSuccess: ({ data }) => {
        setAnchorEl(null);
        setNoteCollection(
          noteCollection.filter((note) => {
            return note.id !== noteID;
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

  //#endregion

  //#region Handlers

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

  //#endregion

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

      <NoteCard ref={ref} {...dragHandleListeners} {...dragHandleAttributes}>
        <Box
          sx={{
            backgroundColor: color ? `category.${color}` : `category.none`,
            display: "flex",
            position: "relative",
          }}
        >
          {/* If category exists, show the name */}
          {categoryName ? (
            <Chip label={categoryName} sx={{ m: 0.5, height: "2em" }} />
          ) : null}

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
      </NoteCard>
    </Box>
  );
}
