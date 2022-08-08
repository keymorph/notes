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
  Button,
  CircularProgress,
  Divider,
  Menu,
  MenuItem,
  Typography,
  Zoom,
} from "@mui/material";
import { motion } from "framer-motion";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import CustomTooltip from "../Shared/CustomTooltip";

export default function ProfileButton({ darkMode, handleDarkModeToggle }) {
  //#region Hooks
  const { data: session, status: sessionStatus } = useSession();

  const { enqueueSnackbar } = useSnackbar();

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
      enqueueSnackbar("An error occurred while signing out", {
        variant: "error",
      });
    });
    setAnchorEl(null);
  };
  //#endregion

  const isUserLoggedIn = sessionStatus === "authenticated";
  const isAuthenticating = sessionStatus === "loading";
  const dropdownOpen = Boolean(anchorEl);
  const profileName = isUserLoggedIn
    ? session.user.name || session.user.email?.split("@")[0]
    : "";

  return (
    <>
      <Button
        color={dropdownOpen ? "primary" : "neutral"}
        aria-label="Profile options"
        size="small"
        onClick={handleDropdownShow}
      >
        <motion.div layout style={{ display: "flex" }}>
          {isUserLoggedIn ? (
            session.user.image ? (
              <Avatar sx={{ height: "1.8rem", width: "1.8rem" }}>
                <Image
                  priority
                  src={session.user.image}
                  alt={"profile picture"}
                  layout="fill"
                />
              </Avatar>
            ) : (
              <AccountCircle sx={{ fontSize: "1.8rem" }} />
            )
          ) : isAuthenticating ? (
            <CircularProgress size={"1.5rem"} />
          ) : (
            <NoAccounts sx={{ fontSize: "1.8rem" }} />
          )}
        </motion.div>
        <Typography
          variant="body2"
          textTransform={"none"}
          alignSelf={"center"}
          ml={"0.5rem"}
        >
          {profileName}
        </Typography>
        <ArrowDropDownOutlined />
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={dropdownOpen}
        onClose={() => setAnchorEl(null)}
        style={{ top: "0.4rem" }}
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
