import { MoreHoriz } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Fade,
  IconButton,
  Menu,
  MenuItem,
  styled,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useMutation } from "react-query";

import {
  createNote,
  deleteNote,
} from "../../../../helpers/requests/note-requests";
import { getOrCreateCategoryId } from "../../../../utils/id-utils";
import NoteActionModal from "../../Modals/NoteActionModal";

const NoteCard = styled(Card)({
  width: "300px",
  minHeight: "300px",
  maxHeight: "400px",
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
  notesHidden,
  setNotesHidden,
  dragHandleListeners,
  dragHandleAttributes,
  isDragging,
}) {
  //#region Hooks
  const [moreMenuAnchorEl, setMoreMenuAnchorEl] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (modalOpen) {
      setNotesHidden(true);
    } else {
      setNotesHidden(false);
    }
  }, [modalOpen]);

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
    setMoreMenuAnchorEl(null); // Close the more menu
    setModalOpen(true);
  };

  const handleEditModalClose = () => {
    setModalOpen(false);
    setMoreMenuAnchorEl(null);
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

  // Close the menu if the notes is being dragged
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
        action={"edit"}
        modalOpen={modalOpen}
        handleModalClose={handleEditModalClose}
      />

      <Fade in={!notesHidden}>
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
            <MenuItem onClick={handleEditModalOpen}>Edit</MenuItem>
            <MenuItem onClick={handleCreateDuplicate}>Duplicate</MenuItem>
            <MenuItem onClick={handleDelete}>Delete</MenuItem>
          </Menu>

          <CardContent
            onClick={handleEditModalOpen}
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
      </Fade>
    </Box>
  );
}
