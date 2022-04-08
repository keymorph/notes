import OutlinedInput from "@mui/material/OutlinedInput";
import { InputAdornment } from "@mui/material";
import Zoom from "@mui/material/Zoom";
import IconButton from "@mui/material/IconButton";
import CancelIcon from "@mui/icons-material/Cancel";
import SearchIcon from "@mui/icons-material/Search";
import * as React from "react";
import { useState, createRef } from "react";

export default function ToolbarSearch({ setSearchValue, searchValue }) {
  // SEARCH
  const [searchFocus, setSearchFocus] = useState(false);

  // Clear search value when Escape key is pressed
  const handleClearOnKeyPress = (event) => {
    if (event.key === "Escape") {
      setSearchValue("");
    }
  };

  const handleClear = () => {
    setSearchValue("");
  };

  const handleSearchInputBlur = () => {
    if (searchValue === "") {
      setSearchFocus(false);
    }
  };

  return (
    <OutlinedInput
      placeholder="Search…"
      value={searchValue}
      sx={{
        ml: 1,
        borderRadius: 20,
        height: "2em",
        width: searchFocus ? "10vw" : "40px",
        minWidth: searchFocus ? "120px" : "40px",
        transition: "all 0.5s ease-in-out",
        cursor: "pointer",
      }}
      onBlur={handleSearchInputBlur}
      onFocus={() => setSearchFocus(true)}
      onChange={(event) =>
        setSearchValue(event.target.value.trimStart().toLowerCase())
      }
      onKeyUp={handleClearOnKeyPress} // Clear search value on Escape key press
      startAdornment={
        <InputAdornment position="start" sx={{ mr: 3 }}>
          <Zoom in={searchFocus}>
            <IconButton
              onClick={handleClear}
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
          <Zoom in={!searchFocus}>
            <IconButton
              onClick={() => setSearchFocus(true)}
              sx={{
                position: "absolute",
                left: 0,
                zIndex: -1,
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
