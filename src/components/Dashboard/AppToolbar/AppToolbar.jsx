import { FilterList, MoreVert, NoteAdd } from "@mui/icons-material";
import { AppBar, Box, Button, IconButton, Toolbar } from "@mui/material";
import { useState } from "react";
import NoteModal from "../NotesTimeline/Note/Modals/NoteModal";

import ToolbarSearch from "./ToolbarSearch";

export default function AppToolbar({
  noteCollection,
  categoriesCollection,
  searchValue,
  setNoteCollection,
  setCategoriesCollection,
  setSearchValue,
}) {
  // MODAL
  const [modalOpen, setModalOpen] = useState(false);
  const handleOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  return (
    <AppBar
      position={"sticky"}
      sx={{
        boxShadow: "none",
      }}
    >
      <Toolbar
        disableGutters
        variant={"dense"}
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <NoteModal
          action={"create"}
          modalOpen={modalOpen}
          handleModalClose={handleModalClose}
          noteCollection={noteCollection}
          setNoteCollection={setNoteCollection}
          categoriesCollection={categoriesCollection}
          setCategoriesCollection={setCategoriesCollection}
        />
        <Box
          display={"flex"}
          flexDirection={"row"}
          gap={"0.3em"}
          alignItems={"center"}
          ml={"0.2em"}
        >
          {/* Only display the search bar and filter if there are notes */}
          {noteCollection.length > 0 && (
            <>
              <IconButton>
                <FilterList />
              </IconButton>
              <ToolbarSearch
                searchValue={searchValue}
                setSearchValue={setSearchValue}
              />
            </>
          )}
        </Box>
        <Box
          display={"flex"}
          flexDirection={"row"}
          gap={"0.3em"}
          alignItems={"center"}
          mr={"0.2em"}
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
          <IconButton>
            <MoreVert />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
