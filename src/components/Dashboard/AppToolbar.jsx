import { Add, FilterAltOutlined, MoreVert } from "@mui/icons-material";
import {
  AppBar,
  Button,
  Fade,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";

import ToolbarSearch from "./AppToolbar/ToolbarSearch";
import ManageCategoriesModal from "./Modals/ManageCategoriesModal";
import NoteActionModal, { NOTE_ACTIONS } from "./Modals/NoteActionModal";

export default function AppToolbar({
  noteCollection,
  categoriesCollection,
  searchValue,
  noteStatus,
  orderFilterViewOpen,
  setNoteCollection,
  setCategoriesCollection,
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

  const [searching, setSearching] = useState(false);

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

  const handleOrderFilterViewChange = () => {
    // If the Order/Filter View is closed and the user is not at the top of the page, scroll to the top and open it
    // Otherwise just open/close without scrolling and without timeout
    if (!orderFilterViewOpen && window.scrollY > 0) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
      // Wait for the scroll to finish before opening the Order/Filter View
      setTimeout(() => {
        setOrderFilterViewOpen(true);
      }, 400);
    } else {
      setOrderFilterViewOpen(!orderFilterViewOpen);
    }
  };
  //#endregion

  //#region Render Components
  const noteActionModal = (
    <NoteActionModal
      action={NOTE_ACTIONS.CREATE}
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
      isMobile={isMobile}
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
      <Toolbar disableGutters variant={"dense"} sx={{ mx: "0.5rem" }}>
        {/* The dom order doesn't matter for these components and as such they are grouped together */}
        {noteStatus !== "loading" && (
          <>
            {moreMenu}
            {manageCategoriesModal}
            {noteActionModal}
          </>
        )}

        {/* Only display the search bar and filter if there are notes */}
        {noteCollection.length > 0 && (
          <>
            <IconButton
              size={"small"}
              onClick={handleOrderFilterViewChange}
              color={orderFilterViewOpen ? "primary" : "inherit"}
            >
              <FilterAltOutlined />
            </IconButton>
            <ToolbarSearch
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              searching={searching}
              setSearching={setSearching}
            />
          </>
        )}

        {/* If on desktop or when not searching, the add note button (with text) will be visible */}
        <Fade in={!isMobile || !searching} unmountOnExit exit={false}>
          <Button
            color={createNoteModalOpen ? "primary" : "inherit"}
            variant={"outlined"}
            size={"small"}
            sx={{
              ml: "auto",
              minWidth: "7rem",
            }}
            startIcon={<Add />}
            onClick={handleCreateNoteModalOpen}
          >
            Add Note
          </Button>
        </Fade>
        {/* If on mobile, the add note button will collapse when searching */}
        <Fade in={isMobile && searching} unmountOnExit exit={false}>
          <IconButton onClick={handleCreateNoteModalOpen} size={"small"}>
            <Add />
          </IconButton>
        </Fade>
        <IconButton
          size={"small"}
          onClick={handleMoreMenuClick}
          color={moreMenuAnchorEl ? "primary" : "inherit"}
        >
          <MoreVert />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}