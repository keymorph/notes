import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import { Box, IconButton } from "@mui/material";

export default function ThemeToggler({ darkMode, handleDarkModeToggle }) {
  return (
    <Box
      sx={{
        width: "1.5em",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent !important",
        cursor: "pointer",
      }}
    >
      <DarkModeRoundedIcon
        sx={{
          position: "absolute",
          fill: "#212121",
          opacity: darkMode ? 0 : 1,
          transform: darkMode ? "rotate(180deg)" : "rotate(0deg)",
          transition: "all 0.5s ease-in-out",
          zIndex: darkMode ? 0 : 1,
          "&:active": {
            fill: "#9a9a9a",
            transform: "scale(1.2) rotate(180deg)",
            animation: "rotating 2s linear infinite",
          },
        }}
        onClick={handleDarkModeToggle}
      />
      <LightModeRoundedIcon
        sx={{
          position: "absolute",
          fill: "#fafafa",
          opacity: darkMode ? 1 : 0,
          transform: darkMode ? "rotate(0deg)" : "rotate(180deg)",
          transition: "all 0.5s ease-in-out",
          zIndex: darkMode ? 1 : 0,
          "&:active": {
            fill: "#9a9a9a",
            transform: "scale(1.2) rotate(180deg)",
            transition: "all 0.2s ease-in-out",
          },
        }}
        onClick={handleDarkModeToggle}
      />
    </Box>
  );
}
