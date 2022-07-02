import { Key as KeyIcon } from "@mui/icons-material";
import { AppBar, Toolbar } from "@mui/material";
import React from "react";
import ProfileDropdown from "./Navbar/ProfileDropdown";

export default function Navbar({ darkMode, handleDarkModeToggle }) {
  return (
    <AppBar sx={{ boxShadow: "none", position: "relative" }}>
      <Toolbar
        id="back-to-top-anchor"
        disableGutters
        variant="dense"
        sx={{
          justifyContent: "space-between",
          mx: "0.5rem",
        }}
      >
        <KeyIcon color="primary" fontSize="large" />
        <ProfileDropdown
          darkMode={darkMode}
          handleDarkModeToggle={handleDarkModeToggle}
        />
      </Toolbar>
    </AppBar>
  );
}
