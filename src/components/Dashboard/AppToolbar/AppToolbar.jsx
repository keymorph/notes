import * as React from "react";
import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Fade from "@mui/material/Fade";
import MenuIcon from "@mui/icons-material/Menu";
import { NoteAdd } from "@mui/icons-material";

import ToolbarSearch from "./ToolbarSearch";
import NoteCreateModal from "../NotesTimeline/Note/NoteCreateModal";
import * as PropTypes from "prop-types";

ToolbarSearch.propTypes = {
  value: PropTypes.any,
  searchFocus: PropTypes.bool,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onKeyUp: PropTypes.func,
  onClick: PropTypes.func,
};
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
    <Fade in>
      <AppBar
        sx={{
          boxShadow: "none",
          position: "sticky",
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
            width="15vw"
            display={"flex"}
            flexDirection={"row"}
            alignItems="center"
          >
            <IconButton edge="start">
              <MenuIcon />
            </IconButton>
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
              Add
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Fade>
  );
}
