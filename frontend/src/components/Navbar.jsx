import React, { useState, useRef, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Card, CardMedia, IconButton, Menu, MenuItem } from "@mui/material";
import { AccountCircle, NoAccounts } from "@mui/icons-material";
import { useNavigate } from "react-router";
import { ThemeToggleSwitch } from "./UI/Theme";
import axios from "axios";
import { Box } from "@mui/system";

const ResponsiveAppBar = ({ darkMode, handleDarkModeToggle }) => {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // remove the token from the local storage and redirect user to login page
  const removeToken = () => {
    localStorage.removeItem("auth-token");
    setAnchorEl(null);
    navigate("../auth", { replace: true });
  };

  const open = Boolean(anchorEl);

  const url = "http://localhost:8000/api";

  useEffect(() => {
    const token = localStorage.getItem("auth-token");
    axios
      .get(`${url}/token`, {
        headers: {
          "auth-token": token, //the token is a variable which holds the token
        },
      })
      .then(() => {
        setButtonDisabled(false);
      })
      // No token found, remain on login page
      .catch((error) => {
        console.error(`Error: ${error}`);
        setButtonDisabled(true);
      });
  }, [navigate]);

  return (
    <AppBar position="static" sx={{ maxHeight: 65 }}>
      <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
        <Card>
          <CardMedia
            component="img"
            height="60"
            image="https://avatars.githubusercontent.com/u/87445501"
            alt="FourScript Logo"
          />
        </Card>
        <Box sx={{ position: "right" }}>
          <ThemeToggleSwitch
            checked={!darkMode}
            onClick={handleDarkModeToggle}
          />

          <IconButton
            aria-label="settings"
            sx={{ marginLeft: "10px", marginRight: "10px" }}
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
};

export default ResponsiveAppBar;
