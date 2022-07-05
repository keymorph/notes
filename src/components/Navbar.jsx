import { Key as KeyIcon } from "@mui/icons-material";
import { AppBar, Box, Divider, Toolbar, Typography } from "@mui/material";
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
        <Box display={"flex"} gap={"0.5rem"} alignItems={"center"}>
          <KeyIcon color="primary" fontSize="large" />
          <Divider orientation={"vertical"} sx={{ height: "1.5rem" }} />
          <Typography variant="h6" color="paper">
            Notes
          </Typography>
        </Box>
        <ProfileDropdown
          darkMode={darkMode}
          handleDarkModeToggle={handleDarkModeToggle}
        />
      </Toolbar>
    </AppBar>
  );
}
