import { MoreHoriz } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Grow,
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
} from "../../../helpers/requests/note-requests";
import { getOrCreateCategoryId } from "../../../utils/id-utils";
import NoteActionModal, { NOTE_ACTIONS } from "../Modals/NoteActionModal";

const NoteCard = styled(Card)({
  width: "20rem",
  height: "22rem",
  overflowWrap: "break-word",
  margin: "5px",
  transition: "opacity 0.2s ease-in-out",
});

export default function Note({
  noteID,
  title,
  description,
  categoryName,
  categoryColor,
  tags,
  categoriesCollection,
  noteCollection,
  setNoteCollection,
  setCategoriesCollection,
  dragHandleListeners,
  dragHandleAttributes,
  isDragging,
}) {
  //#region Hooks
  const [moreMenuAnchorEl, setMoreMenuAnchorEl] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState(NOTE_ACTIONS.VIEW);
  const [hideNote, setHideNote] = useState(false);

  //#region Query Handling Hooks
  const { mutate: mutateDelete, status: deleteStatus } = useMutation(
    deleteNote,
    {
      onSuccess: ({ data }) => {
        setMoreMenuAnchorEl(null);
        // Reflect the database changes on the front-end
        setCategoriesCollection(data.noteItem.categories);
        setNoteCollection(data.noteItem.notes.reverse());
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
        setMoreMenuAnchorEl(null);
        // Reflect the database changes on the front-end
        setCategoriesCollection(data.noteItem.categories);
        setNoteCollection(data.noteItem.notes.reverse());
      },
      onError: (error) => {
        console.error(error.message);
      },
    }
  );
  //#endregion
  //#endregion

  //#region Handlers
  const handleEditModalOpen = () => {
    if (modalAction !== NOTE_ACTIONS.EDIT) {
      setModalAction(NOTE_ACTIONS.EDIT);
    }
    setMoreMenuAnchorEl(null); // Close the more menu
    setModalOpen(true);
    setHideNote(true);
  };

  const handleViewModalOpen = () => {
    if (modalAction !== NOTE_ACTIONS.VIEW) {
      setModalAction(NOTE_ACTIONS.VIEW);
    }
    setMoreMenuAnchorEl(null); // Close the more menu
    setModalOpen(true);
    setHideNote(true);
  };

  const handleActionModalClose = () => {
    setModalOpen(false);
    setMoreMenuAnchorEl(null);
    setHideNote(false);
  };

  const ref = useRef(null);

  const handleMoreMenuClick = (event) => {
    setMoreMenuAnchorEl(event.currentTarget);
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
        id: getOrCreateCategoryId(categoriesCollection, categoryName),
        name: categoryName,
        color: categoryColor,
      },
      tags: tags,
    };
    mutateDuplicate(duplicateNote);
  };
  //#endregion

  // Close the menu if the note is being dragged
  if (moreMenuAnchorEl && isDragging) {
    setMoreMenuAnchorEl(null);
  }

  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      <NoteActionModal
        noteID={noteID}
        title={title}
        description={description}
        categoryName={categoryName}
        categoryColor={categoryColor}
        categoriesCollection={categoriesCollection}
        setCategoriesCollection={setCategoriesCollection}
        setNoteCollection={setNoteCollection}
        action={modalAction}
        modalOpen={modalOpen}
        handleModalClose={handleActionModalClose}
      />

      <Grow in={!hideNote}>
        <NoteCard ref={ref} {...dragHandleListeners} {...dragHandleAttributes}>
          <Box
            sx={{
              backgroundColor: categoryColor
                ? `category.${categoryColor}`
                : `category.none`,
              display: "flex",
              position: "relative",
            }}
          >
            {/* If category exists, show the name */}
            {categoryName ? (
              <Chip label={categoryName} sx={{ m: 0.5, height: "2em" }} />
            ) : null}

            <IconButton
              size={"small"}
              sx={{ m: 0.5, ml: "auto", height: "1em" }}
              onClick={handleMoreMenuClick}
            >
              <MoreHoriz />
            </IconButton>
          </Box>
          {/* Note Action Menu that triggers  */}
          <Menu
            anchorEl={moreMenuAnchorEl}
            open={!!moreMenuAnchorEl}
            onClose={() => setMoreMenuAnchorEl(null)}
          >
            <MenuItem dense onClick={handleEditModalOpen}>
              Edit
            </MenuItem>
            <MenuItem dense onClick={handleCreateDuplicate}>
              Duplicate
            </MenuItem>
            <MenuItem dense onClick={handleDelete}>
              Delete
            </MenuItem>
          </Menu>

          <CardContent
            onClick={handleViewModalOpen}
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
            <Typography
              variant="body2"
              title={"Description"}
              sx={{
                display: "-webkit-box",
                overflow: "hidden",
                textOverflow: "ellipsis",
                WebkitLineClamp: "14",
                WebkitBoxOrient: "vertical",
              }}
            >
              {description}
            </Typography>
          </CardContent>
        </NoteCard>
      </Grow>
    </Box>
  );
}