import { MoreHoriz } from "@mui/icons-material";
import {
  Box,
  CardContent,
  Chip,
  Divider,
  Grow,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  useTheme,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useRef, useState } from "react";
import {
  getOrCreateCategoryID,
  getPaletteCategoryColorName,
} from "../../../helpers/notes/category";

import {
  createNote,
  deleteNote,
} from "../../../helpers/requests/note-requests";
import { MODAL_ACTIONS } from "../../../models/dialogs";
import { NoteCard } from "../../../styles/components/cards";
import NoteActionDialog from "../Dialogs/NoteActionDialog";
import CustomTooltip from "../SharedComponents/CustomTooltip";

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
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  const [moreMenuAnchorEl, setMoreMenuAnchorEl] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState(MODAL_ACTIONS.VIEW);
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
    if (modalAction !== MODAL_ACTIONS.EDIT) {
      setModalAction(MODAL_ACTIONS.EDIT);
    }
    setMoreMenuAnchorEl(null); // Close the more menu
    setModalOpen(true);
    setHideNote(true);
  };

  const handleViewModalOpen = () => {
    if (modalAction !== MODAL_ACTIONS.VIEW) {
      setModalAction(MODAL_ACTIONS.VIEW);
    }
    setMoreMenuAnchorEl(null); // Close the more menu
    setModalOpen(true);
    setHideNote(true);
  };

  const handleActionDialogClose = () => {
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
        id: getOrCreateCategoryID(categoriesCollection, categoryName),
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
    <Box display={"flex"}>
      <NoteActionDialog
        noteID={noteID}
        title={title}
        description={description}
        categoryName={categoryName}
        categoryColor={categoryColor}
        categoriesCollection={categoriesCollection}
        setCategoriesCollection={setCategoriesCollection}
        setNoteCollection={setNoteCollection}
        action={modalAction}
        dialogOpen={modalOpen}
        handleDialogClose={handleActionDialogClose}
      />

      <Grow in={!hideNote}>
        <div>
          <NoteCard
            ref={ref}
            {...dragHandleListeners}
            {...dragHandleAttributes}
          >
            <Box
              sx={{
                cursor: isDragging ? "grabbing" : "grab",
                userSelect: "none",
                backgroundColor: `${getPaletteCategoryColorName(
                  categoryColor
                )}.main`,
              }}
            >
              <Box display="flex" alignItems="center" mx={"0.5rem"}>
                {categoryName ? (
                  <Chip
                    label={categoryName}
                    sx={{ my: "0.3rem", height: "1.25rem" }}
                    size={"small"}
                  />
                ) : null}
                <CustomTooltip title={"Note actions"}>
                  <IconButton
                    color={"neutral"}
                    size={"small"}
                    sx={{ ml: "auto", my: "0.3rem", height: "1.25rem" }}
                    onClick={handleMoreMenuClick}
                  >
                    <MoreHoriz />
                  </IconButton>
                </CustomTooltip>
              </Box>
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
                cursor: isDragging ? "grabbing" : "pointer",
                userSelect: "none",
                height: "100%",
                pb: "1rem",
                px: "1rem",
              }}
            >
              <Typography
                variant="h5"
                title="Title Name"
                fontWeight={"bold"}
                noWrap
              >
                {title}
              </Typography>
              <Divider sx={{ my: "0.5em" }} />
              <Typography
                variant="body2"
                title={"Description"}
                sx={{
                  display: "-webkit-box",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  WebkitLineClamp: "12",
                  WebkitBoxOrient: "vertical",
                }}
              >
                {description}
              </Typography>
            </CardContent>
          </NoteCard>
        </div>
      </Grow>
    </Box>
  );
}
