import { FilterList, MoreVert, NoteAdd } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
} from "@mui/material";
import { useState } from "react";
import ManageCategoriesModal from "../Modals/ManageCategoriesModal";
import NoteActionModal from "../Modals/NoteActionModal";

import ToolbarSearch from "./ToolbarSearch";

export default function AppToolbar({
  noteCollection,
  categoriesCollection,
  searchValue,
  setNoteCollection,
  setCategoriesCollection,
  setSearchValue,
  noteStatus,
}) {
  //#region Hooks
  const [moreMenuAnchorEl, setMoreMenuAnchorEl] = useState(null);
  const [createNoteModalOpen, setCreateNoteModalOpen] = useState(false);
  const [manageCategoriesModalOpen, setManageCategoriesModalOpen] =
    useState(false);
  //#endregion

  //#region Handlers
  const handleMoreMenuClick = (event) => {
    setMoreMenuAnchorEl(event.currentTarget);
  };

  const handleCreateNoteModalOpen = () => {
    setCreateNoteModalOpen(true);
  };

  const handleCreateNoteModalClose = () => {
    setCreateNoteModalOpen(false);
  };

  const handleManageCategoriesModalOpen = () => {
    setMoreMenuAnchorEl(null); // Close the more menu
    setManageCategoriesModalOpen(true);
  };

  const handleManageCategoriesModalClose = () => {
    setManageCategoriesModalOpen(false);
  };
  //#endregion

  //#region Render Components
  const noteActionModal = (
    <NoteActionModal
      action={"create"}
      modalOpen={createNoteModalOpen}
      handleModalClose={handleCreateNoteModalClose}
      noteCollection={noteCollection}
      setNoteCollection={setNoteCollection}
      categoriesCollection={categoriesCollection}
      setCategoriesCollection={setCategoriesCollection}
    />
  );
  const manageCategoriesModal = (
    <ManageCategoriesModal
      categoriesCollection={categoriesCollection}
      setCategoriesCollection={setCategoriesCollection}
      modalOpen={manageCategoriesModalOpen}
      handleModalClose={handleManageCategoriesModalClose}
    />
  );
  const moreMenu = (
    <Menu
      anchorEl={moreMenuAnchorEl}
      open={!!moreMenuAnchorEl}
      onClose={() => setMoreMenuAnchorEl(null)}
    >
      <MenuItem onClick={handleManageCategoriesModalOpen}>
        Manage Categories
      </MenuItem>
    </Menu>
  );
  //#endregion

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
        {/* The dom order doesn't matter for these components and as such they are grouped together */}
        {noteStatus !== "loading" && (
          <>
            {moreMenu}
            {manageCategoriesModal}
            {noteActionModal}
          </>
        )}

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
            onClick={handleCreateNoteModalOpen}
          >
            Add Note
          </Button>
          <IconButton onClick={handleMoreMenuClick}>
            <MoreVert />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
