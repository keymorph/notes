import {
  AccountCircle,
  ArrowDropDownOutlined,
  DarkModeOutlined,
  LightModeOutlined,
  LogoutOutlined,
  ManageAccountsOutlined,
  NoAccounts,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Menu,
  MenuItem,
  Typography,
  Zoom,
} from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import React, { useState } from "react";
import CustomTooltip from "../Dashboard/SharedComponents/CustomTooltip";

export default function ProfileDropdown({ darkMode, handleDarkModeToggle }) {
  //#region Hooks
  const { data: session, status: sessionStatus } = useSession();

  const [anchorEl, setAnchorEl] = useState(null);
  //#endregion

  //#region Handlers
  const handleDropdownShow = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSignOut = async () => {
    // Remove session cookie and redirect user to login page
    await signOut({ callbackUrl: `/auth`, redirect: true }).catch((error) => {
      console.error("Error during sign out: ", error.message);
    });
    setAnchorEl(null);
  };
  //#endregion

  const isUserLoggedIn = sessionStatus === "authenticated";
  const dropdownOpen = Boolean(anchorEl);
  const profileName = isUserLoggedIn
    ? session.user.name || session.user.email?.split("@")[0]
    : "Guest";

  return (
    <>
      <Button
        color={dropdownOpen ? "primary" : "neutral"}
        aria-label="Profile options"
        size="small"
        disabled={!isUserLoggedIn}
        onClick={handleDropdownShow}
      >
        {/*<ThemeToggleButton*/}
        {/*  darkMode={darkMode}*/}
        {/*  handleDarkModeToggle={handleDarkModeToggle}*/}
        {/*/>*/}
        <Box mr={"0.5rem"} display={"flex"}>
          {isUserLoggedIn ? (
            session.user.image ? (
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
            )
          ) : (
            <NoAccounts />
          )}
        </Box>
        <Typography variant="body2" alignSelf={"center"}>
          {profileName}
        </Typography>
        <ArrowDropDownOutlined />
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={dropdownOpen}
        onClose={() => setAnchorEl(null)}
      >
        <CustomTooltip title={"Coming soon™"} disableableButton>
          <MenuItem disabled dense sx={{ gap: "0.5em" }}>
            <ManageAccountsOutlined />
            Profile Settings
          </MenuItem>
        </CustomTooltip>
        <MenuItem dense onClick={handleDarkModeToggle} sx={{ gap: "0.5em" }}>
          <Zoom in={darkMode} appear={false}>
            <LightModeOutlined sx={{ mr: "-2rem" }} />
          </Zoom>
          <Zoom in={!darkMode} appear={false}>
            <DarkModeOutlined />
          </Zoom>
          Switch to {darkMode ? "Light" : "Dark"}
        </MenuItem>
        <Divider />
        <MenuItem
          disabled={!isUserLoggedIn}
          dense
          onClick={handleSignOut}
          sx={{ gap: "0.5em" }}
        >
          <LogoutOutlined />
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}
