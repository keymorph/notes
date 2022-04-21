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
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ThemeToggleButton from "./ThemeToggleButton";

export default function ResponsiveAppBar({ darkMode, handleDarkModeToggle }) {
  const router = useRouter();

  const [anchorEl, setAnchorEl] = useState(null);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // To log the user out, remove the token from the local storage and redirect user to login page
  const removeToken = () => {
    localStorage.removeItem("auth-token");
    setAnchorEl(null);
    router.replace("/auth");
  };

  const open = Boolean(anchorEl);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/user`, {
        headers: {
          "auth-token": localStorage.getItem("auth-token"), //the token is a variable which holds the token
        },
      })
      .then(() => {
        setButtonDisabled(false);
      })
      // No token found, remain on login page
      .catch((error) => {
        console.error(`Error: ${error.message}`);
        setButtonDisabled(true);
      });
  }, []);

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
            disabled={buttonDisabled}
            size="small"
          >
            {buttonDisabled ? <NoAccounts /> : <AccountCircle />}
          </IconButton>
        </Box>
        <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
          <MenuItem onClick={removeToken}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
