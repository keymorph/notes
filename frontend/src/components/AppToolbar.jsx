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

import NoteCreateModal from "./Dashboard/Note/NoteCreateModal";

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
        <AppBar position="static">
          <Toolbar sx={{ display: "flex" }}>
            <NoteCreateModal
              modalOpen={modalOpen}
              handleClose={handleClose}
              noteCollection={noteCollection}
              setNoteCollection={setNoteCollection}
              categories={categories}
              setCategories={setCategories}
            />
            <IconButton edge="start" aria-label="open drawer">
              <MenuIcon />
            </IconButton>

            <OutlinedInput
              placeholder="Search…"
              value={searchValue}
              sx={{
                ml: "auto",
                mr: "auto",
                borderRadius: 20,
                height: "2.5em",
                width: "10%",
                maxWidth: "400px",
                minWidth: "125px",
                transition: "width 0.5s ease-in-out",
                "&:hover": {
                  width: "15%",
                  transition: "width 0.3s ease-in-out",
                },
              }}
              onChange={(event) =>
                setSearchValue(event.target.value.toLowerCase())
              }
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
                    <SearchIcon
                      sx={{ position: "absolute", top: 8, left: 10 }}
                    />
                  </Zoom>
                </InputAdornment>
              }
              variant="filled"
            >
              {/* onChange={setSearchValue} */}
            </OutlinedInput>
            <Button
              variant="outlined"
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
