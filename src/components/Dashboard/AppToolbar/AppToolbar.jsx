import { FilterAltOutlined, MoreVert } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import ManageCategoriesModal from "../Modals/ManageCategoriesModal";
import NoteActionModal from "../Modals/NoteActionModal";

import ToolbarSearch from "./ToolbarSearch";

export default function AppToolbar({
  noteCollection,
  categoriesCollection,
  searchValue,
  noteStatus,
  orderFilterViewOpen,
  setNoteCollection,
  setCategoriesCollection,
  setNotesHidden,
  setSearchValue,
  setOrderFilterViewOpen,
  setOrderViewOpen,
}) {
  //#region Hooks
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [moreMenuAnchorEl, setMoreMenuAnchorEl] = useState(null);
  const [createNoteModalOpen, setCreateNoteModalOpen] = useState(false);
  const [manageCategoriesModalOpen, setManageCategoriesModalOpen] =
    useState(false);

  // Hide notes while the modal is open
  useEffect(() => {
    if (createNoteModalOpen || manageCategoriesModalOpen) {
      setNotesHidden(true);
    } else {
      setNotesHidden(false);
    }
  }, [createNoteModalOpen, manageCategoriesModalOpen]);

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
      title={""}
      description={""}
      categoryName={""}
      categoryColor={"none"}
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
      setNoteCollection={setNoteCollection}
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
      <MenuItem dense onClick={handleManageCategoriesModalOpen}>
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
          gap={"0.3em"}
          alignItems={"center"}
          ml={"0.5em"}
          mr={"auto"}
        >
          {/* Only display the search bar and filter if there are notes */}
          {noteCollection.length > 0 && (
            <>
              <IconButton
                size={"small"}
                onClick={() => setOrderFilterViewOpen(!orderFilterViewOpen)}
                color={orderFilterViewOpen ? "primary" : "inherit"}
              >
                <FilterAltOutlined />
              </IconButton>
              <ToolbarSearch
                searchValue={searchValue}
                setSearchValue={setSearchValue}
              />
            </>
          )}
        </Box>

        <Box display={"flex"} gap={"0.3em"} alignItems={"center"} mr={"0.75em"}>
          <Button
            color={createNoteModalOpen ? "primary" : "inherit"}
            variant={"text"}
            size={"small"}
            sx={{
              ml: "0.3em",
              minWidth: "6em",
            }}
            // startIcon={<Add />}
            onClick={handleCreateNoteModalOpen}
          >
            {isMobile ? "Add Note" : "Add Note"}
          </Button>
          {/*<IconButton onClick={handleCreateNoteModalOpen} sx={{ ml: "0.3em" }}>*/}
          {/*  <Add />*/}
          {/*</IconButton>*/}
          <IconButton
            size={"small"}
            sx={{ ml: "-0.5rem" }}
            onClick={handleMoreMenuClick}
            color={moreMenuAnchorEl ? "primary" : "inherit"}
          >
            <MoreVert />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
