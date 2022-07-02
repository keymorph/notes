import SearchIcon from "@mui/icons-material/Search";
import { Fade, OutlinedInput } from "@mui/material";
import IconButton from "@mui/material/IconButton";

export default function ToolbarSearch({
  setSearchValue,
  searchValue,
  searching,
  setSearching,
}) {
  //#region Handlers
  const handleSearchToggle = () => {
    if (!searchValue) {
      setSearching((searching) => !searching);
    }
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value.trimStart().toLowerCase());
  };
  //#endregion

  return (
    <>
      <Fade in={!searching} unmountOnExit exit={false}>
        <IconButton onClick={handleSearchToggle} size={"small"}>
          <SearchIcon />
        </IconButton>
      </Fade>
      <Fade in={searching} unmountOnExit exit={false}>
        <OutlinedInput
          autoFocus={searching}
          placeholder="Search…"
          value={searchValue}
          onBlur={handleSearchToggle}
          fullWidth
          sx={{
            borderRadius: 20,
            mx: "0.5rem",
            height: "2rem",
            maxWidth: "28rem",
          }}
          onChange={handleSearchChange}
        />
      </Fade>
    </>
  );
}
