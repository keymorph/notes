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
import NoteCreateModal from "../Note/NoteCreateModal";
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
    <Box sx={{ flexGrow: 1 }}>
      <Fade in>
        <AppBar
          position="fixed"
          sx={{ backgroundColor: "transparent", boxShadow: "none", top: "3em" }}
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
            {/*Center box horizontally and vertically */}
            <Box display={"flex"} flexDirection={"row"} alignItems="center">
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
            <Box display={"flex"} flexDirection={"row"} alignItems="center">
              <Button
                variant="outlined"
                sx={{
                  ml: "auto",
                  height: "2em",
                  width: "15vw",
                  maxWidth: "10em",
                }}
                startIcon={<NoteAdd />}
                onClick={handleOpen}
              >
                Add Note
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
      </Fade>
    </Box>
  );
}
