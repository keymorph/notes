import { Add, FilterList, MoreVert, Sort } from "@mui/icons-material";
import {
  AppBar,
  Box,
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
  filterViewOpen,
  setNoteCollection,
  setCategoriesCollection,
  setNotesHidden,
  setSearchValue,
  setFilterViewOpen,
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
          gap={"0.3em"}
          alignItems={"center"}
          ml={"0.5em"}
          mr={"auto"}
        >
          {/* Only display the search bar and filter if there are notes */}
          {noteCollection.length > 0 && (
            <>
              <IconButton sx={{ mr: "-0.5rem" }}>
                <Sort />
              </IconButton>
              <IconButton onClick={() => setFilterViewOpen(!filterViewOpen)}>
                <FilterList />
              </IconButton>
              <ToolbarSearch
                searchValue={searchValue}
                setSearchValue={setSearchValue}
              />
            </>
          )}
        </Box>

        <Box display={"flex"} gap={"0.3em"} alignItems={"center"} mr={"0.75em"}>
          {/*<Button*/}
          {/*  variant="outlined"*/}
          {/*  sx={{*/}
          {/*    height: "1.8rem",*/}
          {/*    minWidth: isMobile ? "2em" : "auto",*/}
          {/*    maxWidth: isMobile ? "2em" : "auto",*/}
          {/*    ".MuiButton-startIcon": {*/}
          {/*      mr: isMobile ? "0em" : "0.5rem",*/}
          {/*      ml: isMobile ? "0em" : "-0.25rem",*/}
          {/*    },*/}
          {/*  }}*/}
          {/*  startIcon={<Add />}*/}
          {/*  onClick={handleCreateNoteModalOpen}*/}
          {/*>*/}
          {/*  {isMobile ? "" : "Add Note"}*/}
          {/*</Button>*/}
          <IconButton onClick={handleCreateNoteModalOpen} sx={{ ml: "0.3em" }}>
            <Add />
          </IconButton>
          <IconButton sx={{ ml: "-0.5rem" }} onClick={handleMoreMenuClick}>
            <MoreVert />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
