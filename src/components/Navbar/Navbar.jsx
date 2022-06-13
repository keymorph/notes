import { AccountCircle, Key as KeyIcon, NoAccounts } from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
} from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import React, { useState } from "react";
import ThemeToggleButton from "./ThemeToggleButton";

export default function ResponsiveAppBar({ darkMode, handleDarkModeToggle }) {
  const { data: session, status: sessionStatus } = useSession();
  const isUserLoggedIn = sessionStatus === "authenticated";

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSignOut = async () => {
    // Remove session cookie and redirect user to login page
    await signOut({ callbackUrl: `/auth`, redirect: true }).catch((error) => {
      console.error("Error during sign out: ", error.message);
    });
    setAnchorEl(null);
  };

  const userAvatar = session?.user?.image ? (
    <Avatar sx={{ height: "1.5em", width: "1.5em" }}>
      <Image
        priority
        src={session.user.image}
        alt={"profile picture"}
        layout="fill"
      />
    </Avatar>
  ) : (
    <AccountCircle />
  );

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
        <KeyIcon color="primary" fontSize="large" sx={{ mx: "0.5rem" }} />
        <Box display={"flex"} flexDirection={"row"}>
          <ThemeToggleButton
            darkMode={darkMode}
            handleDarkModeToggle={handleDarkModeToggle}
          />
          <IconButton
            aria-label="settings"
            sx={{ mx: "0.5rem" }}
            onClick={handleClick}
            disabled={!isUserLoggedIn}
            size="small"
          >
            {isUserLoggedIn ? userAvatar : <NoAccounts />}
          </IconButton>
        </Box>
        <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
          <MenuItem onClick={handleSignOut}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
