import { NoteAdd } from "@mui/icons-material";
import { AppBar, Box, Button, Collapse, Toolbar } from "@mui/material";
import { useState } from "react";
import NoteCreateModal from "../NotesTimeline/Note/NoteCreateModal";

import ToolbarSearch from "./ToolbarSearch";

export default function AppToolbar({
  noteCollection,
  setNoteCollection,
  setSearchValue,
  categories,
  searchValue,
  setCategories,
}) {
  // MODAL
  const [modalOpen, setModalOpen] = useState(false);
  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  return (
    <Collapse in>
      <AppBar
        position="sticky"
        sx={{
          boxShadow: "none",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
          variant="dense"
        >
          <NoteCreateModal
            modalOpen={modalOpen}
            handleClose={handleClose}
            noteCollection={noteCollection}
            setNoteCollection={setNoteCollection}
            categories={categories}
            setCategories={setCategories}
          />
          <Box
            width="25vw"
            display={"flex"}
            flexDirection={"row"}
            alignItems="center"
          >
            {/* Only display the search bar if there are notes */}
            {noteCollection.length > 0 && (
              <ToolbarSearch
                searchValue={searchValue}
                setSearchValue={setSearchValue}
              />
            )}
          </Box>
          <Box
            width="15vw"
            display={"flex"}
            flexDirection={"row-reverse"}
            alignItems="center"
          >
            <Button
              variant="outlined"
              sx={{
                height: "2em",
                minWidth: "6em",
              }}
              startIcon={<NoteAdd />}
              onClick={handleOpen}
            >
              Add Note
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Collapse>
  );
}
