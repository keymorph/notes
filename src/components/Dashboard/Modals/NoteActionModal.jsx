import { Close, Restore } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Card,
  Grow,
  IconButton,
  Modal,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import {
  NOTE_DESCRIPTION_CHAR_LIMIT,
  NOTE_TITLE_CHAR_LIMIT,
} from "../../../constants/input-limits";
import {
  createNote,
  updateNote,
} from "../../../helpers/requests/note-requests";
import { variantFadeSlideUpSlow } from "../../../styles/animations/definitions";
import { modalCard } from "../../../styles/components/modal";
import { getOrCreateCategoryId } from "../../../utils/id-utils";
import CategoryChip from "./Category/CategoryChip";
import SearchCategory from "./Category/SearchCategory";

export default function NoteActionModal({
  noteID,
  title,
  description,
  categoryName,
  categoryColor,
  categoriesCollection,
  setNoteCollection,
  setCategoriesCollection,
  action,
  modalOpen,
  handleModalClose,
}) {
  //#region Hooks
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
  const [newCategoryName, setNewCategoryName] = useState(categoryName);
  const [newCategoryColor, setNewCategoryColor] = useState(categoryColor);
  const [displayCategoryChip, setDisplayCategoryChip] = useState(
    !!categoryName
  );
  const [isCategoryNew, setIsCategoryNew] = useState(false);

  useEffect(() => {
    setNewTitle(title);
    setNewDescription(description);
    setNewCategoryName(categoryName);
    setNewCategoryColor(categoryColor);
    setDisplayCategoryChip(!!categoryName);
  }, [title, description, categoryName, categoryColor]);
  //#endregion

  const titleError = newTitle.trim() === "";
  const valuesChanged =
    newTitle.trim() !== title ||
    newDescription.trim() !== description ||
    newCategoryName.trim() !== categoryName ||
    newCategoryColor !== categoryColor;

  //#region Query Handling Hooks
  const { mutate: mutateEdit, status: editStatus } = useMutation(updateNote, {
    onSuccess: ({ data }) => {
      // Reflect the database changes on the front-end
      setNoteCollection(data.noteItem.notes.reverse());
      setCategoriesCollection(data.noteItem.categories);
      setIsCategoryNew(false); // Reset the flag. If a new category was created, it is not new anymore
    },
    onError: (error) => {
      console.error(error.message);
    },
  });

  const { mutate: mutateCreate, status: createStatus } = useMutation(
    createNote,
    {
      onSuccess: ({ data }) => {
        handleModalClose();
        // Reflect the database changes on the front-end
        setNoteCollection(data.noteItem.notes.reverse());
        setCategoriesCollection(data.noteItem.categories);
        setTimeout(() => {
          resetModalValues(); // Don't immediately reset the values till the closing animation is complete
        }, 500);
      },
      onError: (error) => {
        console.error(error.message);
      },
    }
  );
  //#endregion
  //#endregion

  //#region Helper Functions
  // Reset modal values is used when creating a note
  const resetModalValues = () => {
    setNewTitle(title);
    setNewDescription(description);
    setNewCategoryName(categoryName);
    setNewCategoryColor(categoryColor);
    setDisplayCategoryChip(!!categoryName);
    setIsCategoryNew(false);
  };
  //#endregion

  //#region Handlers
  const handleCreateNote = () => {
    const newNote = {
      title: `${newTitle.trim()}`,
      description: `${newDescription.trim()}`,
      category: {
        id: getOrCreateCategoryId(categoriesCollection, newCategoryName.trim()),
        name: `${newCategoryName.trim()}`,
        color: `${newCategoryColor || "none"}`,
      },
      tags: [],
    };
    mutateCreate(newNote);
  };

  const handleEditNote = () => {
    // If no changes made, no database request necessary
    if (valuesChanged) {
      const editedNote = {
        noteID: Number(noteID),
        title: `${newTitle.trim()}`,
        description: `${newDescription.trim()}`,
        category: {
          id: getOrCreateCategoryId(
            categoriesCollection,
            newCategoryName.trim()
          ),
          name: displayCategoryChip ? `${newCategoryName.trim()}` : "", // Ensure we don't send the temporary category name
          color: `${newCategoryColor}`,
        },
        tags: [],
      };
      mutateEdit(editedNote);
    }
    handleModalClose();
  };

  const handleCategoryChipDelete = () => {
    setNewCategoryName("");
    setNewCategoryColor("none");
    setDisplayCategoryChip(false);
    setIsCategoryNew(false);
  };

  const handleBeforeModalClose = (event, reason) => {
    if (reason === "closeModal") {
      handleModalClose();
      setTimeout(() => {
        resetModalValues();
      }, 500); // Don't immediately reset the values till the closing animation is complete
    } else {
      if (action === "edit") {
        handleEditNote();
      } else if (action === "create") {
        handleModalClose();
      }
    }
  };
  //#endregion

  return (
    <Modal
      open={modalOpen}
      onClose={(event, reason) => handleBeforeModalClose(event, reason)}
      closeAfterTransition
    >
      <Grow in={modalOpen}>
        <Card sx={modalCard}>
          <Box display={"flex"}>
            <Typography
              display={"flex"}
              alignSelf={"center"}
              variant="h5"
              color={"primary"}
            >
              {action === "edit" && "Edit Note"}
              {action === "create" && "Create a Note"}
            </Typography>
            <IconButton
              disabled={!valuesChanged}
              onClick={resetModalValues}
              sx={{ ml: "auto", transition: "all 0.2s ease-in-out" }}
            >
              <Restore />
            </IconButton>
            <IconButton
              onClick={(event) => handleBeforeModalClose(event, "closeModal")}
              edge="end"
            >
              <Close />
            </IconButton>
          </Box>

          <TextField
            required
            id="outlined-required"
            label="Title"
            value={newTitle}
            sx={{ my: "1em" }}
            inputProps={{
              maxLength: NOTE_TITLE_CHAR_LIMIT,
            }}
            onChange={(event) => setNewTitle(event.target.value)}
          />

          <TextField
            id="outlined-multiline-static"
            label="Description"
            value={newDescription}
            multiline
            rows={isMobile ? 6 : 8}
            sx={{ mb: 2 }}
            inputProps={{ maxLength: NOTE_DESCRIPTION_CHAR_LIMIT }}
            onChange={(event) => setNewDescription(event.target.value)}
          />

          {/* Display either the category chip or the search category component based on the user intended action */}
          {displayCategoryChip ? (
            <motion.div
              variants={variantFadeSlideUpSlow}
              initial={"hidden"}
              animate={"visible"}
              exit={"hidden"}
            >
              <CategoryChip
                categoryName={newCategoryName}
                categoryColor={newCategoryColor}
                setCategoryName={setNewCategoryName}
                setCategoryColor={setNewCategoryColor}
                categoryCollection={categoriesCollection}
                enableEdit={isCategoryNew} // Enable edit if category is new
                onDelete={handleCategoryChipDelete}
              />
            </motion.div>
          ) : (
            <SearchCategory
              categoriesCollection={categoriesCollection}
              categoryName={newCategoryName}
              setCategoryName={setNewCategoryName}
              setCategoryColor={setNewCategoryColor}
              setIsCategoryNew={setIsCategoryNew}
              setDisplayCategoryChip={setDisplayCategoryChip}
            />
          )}
          <LoadingButton
            loading={editStatus === "loading" || createStatus === "loading"}
            variant="contained"
            size="small"
            disabled={titleError || !valuesChanged} // Disable button if required title field is empty
            onClick={action === "edit" ? handleEditNote : handleCreateNote}
            sx={{
              border: "1px",
              mt: 2,
              ml: "auto",
            }}
          >
            {action === "edit" && "Save"}
            {action === "create" && "Create"}
          </LoadingButton>
        </Card>
      </Grow>
    </Modal>
  );
}
