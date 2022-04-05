import * as React from "react";
import { useState, useRef, useEffect } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import InputBase from "@mui/material/InputBase";
import OutlinedInput from "@mui/material/OutlinedInput";
import Fade from "@mui/material/Fade";
import Zoom from "@mui/material/Zoom";
import MenuIcon from "@mui/icons-material/Menu";
import { Cancel, NoteAdd, Search } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import CancelIcon from "@mui/icons-material/Cancel";
import { FilledInput, InputAdornment } from "@mui/material";

import NoteCreateModal from "./Note/NoteCreateModal";

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

  // SEARCH
  const [searchFocus, setSearchFocus] = useState(false);
  // Clear search value when Escape key is pressed
  const handleClearOnKeyPress = (event) => {
    if (event.key === "Escape") {
      setSearchValue("");
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Fade in>
        <AppBar position="static" sx={{ boxShadow: "none" }}>
          <Toolbar sx={{ display: "flex" }} variant="dense">
            <NoteCreateModal
              modalOpen={modalOpen}
              handleClose={handleClose}
              noteCollection={noteCollection}
              setNoteCollection={setNoteCollection}
              categories={categories}
              setCategories={setCategories}
            />
            <IconButton
              edge="start"
              aria-label="open drawer"
              sx={{ mr: "auto" }}
            >
              <MenuIcon />
            </IconButton>
            {/* Only display the search bar if there are notes */}
            {noteCollection.length > 0 && (
              <OutlinedInput
                placeholder="Search…"
                value={searchValue}
                sx={{
                  position: "absolute",
                  borderRadius: 20,
                  height: "2em",
                  width: searchFocus ? "15%" : "10%",
                  maxWidth: "400px",
                  minWidth: "120px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  transition: "width 0.5s ease-in-out",
                  "&:hover": {
                    width: "15%",
                    transition: "width 0.25s ease-in-out",
                  },
                }}
                onChange={(event) =>
                  setSearchValue(event.target.value.trim().toLowerCase())
                }
                onBlur={() => setSearchFocus(false)}
                onFocus={() => setSearchFocus(true)}
                onKeyUp={handleClearOnKeyPress} // Clear search value on Escape key press
                startAdornment={
                  <InputAdornment position="start" sx={{ mr: 3 }}>
                    <Zoom in={searchValue !== ""}>
                      <IconButton
                        onClick={() => setSearchValue("")}
                        sx={{ position: "absolute", left: 0 }}
                      >
                        <CancelIcon />
                      </IconButton>
                    </Zoom>
                    <Zoom in={searchValue === ""}>
                      <SearchIcon sx={{ position: "absolute", left: 8 }} />
                    </Zoom>
                  </InputAdornment>
                }
                variant="filled"
              />
            )}
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
          </Toolbar>
        </AppBar>
      </Fade>
    </Box>
  );
}
