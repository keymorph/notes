import { AccountCircle, NoAccounts } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Card,
  CardMedia,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
} from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import React, { useState } from "react";
import ThemeToggleButton from "./ThemeToggleButton";

export default function ResponsiveAppBar({ darkMode, handleDarkModeToggle }) {
  const { status: sessionStatus } = useSession();
  const isUserLoggedIn = sessionStatus === "authenticated";

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSignOut = async () => {
    // Remove session cookie and redirect user to login page
    await signOut({ callbackUrl: `/auth` }).catch((error) => {
      console.error("Error during sign out: ", error.message);
    });
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <AppBar sx={{ boxShadow: "none", position: "relative" }}>
      <Toolbar
        id="back-to-top-anchor"
        disableGutters
        variant="dense"
        sx={{
          justifyContent: "space-between",
        }}
      >
        <Card>
          <CardMedia
            component="img"
            height="48px"
            image="https://avatars.githubusercontent.com/u/87445501"
            alt="FourScript Logo"
          />
        </Card>
        <Box display={"flex"} flexDirection={"row"}>
          <ThemeToggleButton
            darkMode={darkMode}
            handleDarkModeToggle={handleDarkModeToggle}
          />
          <IconButton
            aria-label="settings"
            sx={{ marginLeft: "0.5em", marginRight: "0.5em" }}
            onClick={handleClick}
            disabled={!isUserLoggedIn}
            size="small"
          >
            {isUserLoggedIn ? <AccountCircle /> : <NoAccounts />}
          </IconButton>
        </Box>
        <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
          <MenuItem onClick={handleSignOut}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
