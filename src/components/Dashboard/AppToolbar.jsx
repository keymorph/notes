import {
  Add,
  FilterAlt,
  FilterAltOutlined,
  MoreVert,
} from "@mui/icons-material";
import {
  AppBar,
  Badge,
  Box,
  Button,
  Fade,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { MODAL_ACTIONS } from "../../models/dialogs";
import CustomTooltip from "../Shared/CustomTooltip";

import ToolbarSearch from "./AppToolbar/ToolbarSearch";
import ManageCategoriesDialog from "./Dialogs/ManageCategoriesDialog";
import NoteActionDialog from "./Dialogs/NoteActionDialog";

export default function AppToolbar({
  noteCollection,
  categoriesCollection,
  filterCategories,
  searchValue,
  noteStatus,
  orderFilterDropdownOpen,
  setNoteCollection,
  setCategoriesCollection,
  setSearchValue,
  setOrderFilterViewOpen,
}) {
  //#region Hooks
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [moreMenuAnchorEl, setMoreMenuAnchorEl] = useState(null);
  const [createNoteDialogOpen, setCreateNoteDialogOpen] = useState(false);
  const [manageCategoriesDialogOpen, setManageCategoriesDialogOpen] =
    useState(false);

  const [searching, setSearching] = useState(false);
  const [shouldDisplayBigAddButton, setShouldDisplayBigAddButton] =
    useState(true);

  useEffect(() => {
    // Delay the display of the big add note button to avoid it cutting in front of the searchbar animation
    if (isMobile) {
      setTimeout(() => {
        setShouldDisplayBigAddButton(!searching);
      }, 200);
    }
  }, [searching]);

  //#endregion

  //#region Handlers
  const handleMoreMenuClick = (event) => {
    setMoreMenuAnchorEl(event.currentTarget);
  };

  const handleCreateNoteModalOpen = () => {
    setCreateNoteDialogOpen(true);
  };

  const handleCreateNoteDialogClose = () => {
    setCreateNoteDialogOpen(false);
  };

  const handleManageCategoriesModalOpen = () => {
    setMoreMenuAnchorEl(null); // Close the more menu
    setManageCategoriesDialogOpen(true);
  };

  const handleManageCategoriesModalClose = () => {
    setManageCategoriesDialogOpen(false);
  };

  const handleOrderFilterViewChange = () => {
    // If the Order/Filter View is closed and the user is not at the top of the page, scroll to the top and open it
    // Otherwise just open/close without scrolling and without timeout
    if (!orderFilterDropdownOpen && window.scrollY > 0) {
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
      setOrderFilterViewOpen(!orderFilterDropdownOpen);
    }
  };
  //#endregion

  //#region Render Components
  const noteActionModal = (
    <NoteActionDialog
      action={MODAL_ACTIONS.CREATE_NOTE}
      title={""}
      description={""}
      categoryName={""}
      categoryColor={"none"}
      dialogOpen={createNoteDialogOpen}
      handleDialogClose={handleCreateNoteDialogClose}
      noteCollection={noteCollection}
      setNoteCollection={setNoteCollection}
      categoriesCollection={categoriesCollection}
      setCategoriesCollection={setCategoriesCollection}
    />
  );
  const manageCategoriesModal = (
    <ManageCategoriesDialog
      categoriesCollection={categoriesCollection}
      setCategoriesCollection={setCategoriesCollection}
      setNoteCollection={setNoteCollection}
      dialogOpen={manageCategoriesDialogOpen}
      handleDialogClose={handleManageCategoriesModalClose}
      isMobile={isMobile}
    />
  );
  const moreMenu = (
    <Menu
      anchorEl={moreMenuAnchorEl}
      open={!!moreMenuAnchorEl}
      onClose={() => setMoreMenuAnchorEl(null)}
      style={{ top: "0.4rem" }}
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
        backgroundColor: "background.appBar",
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
            <CustomTooltip
              title={
                orderFilterDropdownOpen
                  ? "Close filters dropdown"
                  : "Open filters dropdown"
              }
              placement={"right"}
            >
              <IconButton
                size={"small"}
                onClick={handleOrderFilterViewChange}
                color={orderFilterDropdownOpen ? "primary" : "neutral"}
              >
                <Badge
                  color={"primary"}
                  invisible={
                    filterCategories.length === 0 || orderFilterDropdownOpen
                  }
                  variant={"dot"}
                >
                  {orderFilterDropdownOpen ? (
                    <FilterAlt />
                  ) : (
                    <FilterAltOutlined />
                  )}
                </Badge>
              </IconButton>
            </CustomTooltip>
            <ToolbarSearch
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              searching={searching}
              setSearching={setSearching}
            />
          </>
        )}
        <Box display={"flex"} ml={"auto"}>
          {/* If on desktop or when not searching, the add note button (with text) will be visible */}
          <Fade
            in={(!isMobile || !searching) && shouldDisplayBigAddButton}
            unmountOnExit
            appear={false}
            exit={false}
          >
            <Button
              disabled={noteStatus === "loading"}
              color={createNoteDialogOpen ? "primary" : "neutral"}
              variant={"outlined"}
              size={"small"}
              sx={{
                minWidth: "7rem",
                mr: "0.5rem",
              }}
              startIcon={<Add />}
              onClick={handleCreateNoteModalOpen}
            >
              Add Note
            </Button>
          </Fade>
          {/* If on mobile, the add note button will collapse when searching */}
          <Fade
            in={isMobile && searching}
            timeout={{ enter: 200, exit: 200 }}
            unmountOnExit
            appear={false}
          >
            <IconButton
              disabled={noteStatus === "loading"}
              color={createNoteDialogOpen ? "primary" : "neutral"}
              onClick={handleCreateNoteModalOpen}
              size={"small"}
            >
              <Add />
            </IconButton>
          </Fade>
          <CustomTooltip
            title={"More options"}
            placement={"left"}
            disableableButton
          >
            <IconButton
              disabled={noteStatus === "loading"}
              size={"small"}
              onClick={handleMoreMenuClick}
              color={moreMenuAnchorEl ? "primary" : "neutral"}
            >
              <MoreVert />
            </IconButton>
          </CustomTooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
