import CancelIcon from "@mui/icons-material/Cancel";
import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import Zoom from "@mui/material/Zoom";
import * as React from "react";

export default function ToolbarSearch({ setSearchValue, searchValue }) {
  // Clear search value when Escape key is pressed
  const handleClearOnKeyPress = (event) => {
    if (event.key === "Escape") {
      setSearchValue("");
    }
  };

  const handleClear = () => {
    setSearchValue("");
  };

  const handleOnChange = (event) => {
    setSearchValue(event.target.value.trimStart().toLowerCase());
  };

  return (
    <OutlinedInput
      placeholder="Search…"
      value={searchValue}
      sx={{
        ml: 1,
        borderRadius: 20,
        height: "2em",
        minWidth: "120px",
        maxWidth: "240px",
      }}
      onChange={handleOnChange}
      onKeyUp={handleClearOnKeyPress} // Clear search value on Escape key press
      startAdornment={
        <InputAdornment position="start" sx={{ mr: 3 }}>
          <Zoom in={searchValue !== ""}>
            <IconButton
              onClick={handleClear}
              tabIndex={-1}
              sx={{
                position: "absolute",
                left: 0,
              }}
            >
              <CancelIcon
                sx={{
                  opacity: searchValue === "" ? 0.5 : 1,
                  transition: "opacity 0.2s ease-in-out",
                }}
              />
            </IconButton>
          </Zoom>
          <Zoom in={searchValue === ""}>
            <IconButton
              tabIndex={-1}
              sx={{
                position: "absolute",
                left: 0,
              }}
            >
              <SearchIcon />
            </IconButton>
          </Zoom>
        </InputAdornment>
      }
      variant="filled"
    />
  );
}
