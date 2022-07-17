import SearchIcon from "@mui/icons-material/Search";
import { OutlinedInput } from "@mui/material";

export default function ToolbarSearch({
  setSearchValue,
  searchValue,
  searching,
  setSearching,
}) {
  //#region Handlers
  const handleSearchToggle = (isSearching) => {
    if (searchValue.trim() === "") {
      // Add a small timeout in case the user presses the add icon button (else it dismounts and it cannot be pressed)
      setTimeout(() => {
        setSearching(isSearching);
      }, 10);
    }
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value.trimStart().toLowerCase());
  };
  //#endregion

  return (
    <OutlinedInput
      startAdornment={
        <SearchIcon
          fontSize={searching ? "medium" : "small"}
          sx={{
            transition: "font-size 0.2s ease-in-out",
            mr: "0.25rem",
            ml: "-0.25rem",
          }}
        />
      }
      placeholder="Search…"
      value={searchValue}
      onFocus={() => handleSearchToggle(true)}
      onBlur={() => handleSearchToggle(false)}
      fullWidth
      sx={{
        borderRadius: 20,
        mx: "0.5rem",
        height: "2.25rem",
        maxWidth: searching ? "24rem" : "8rem",
        transition: "max-width 0.2s ease-in-out",
      }}
      onChange={handleSearchChange}
    />
  );
}
