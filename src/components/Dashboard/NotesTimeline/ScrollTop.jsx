import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Box, Fab, useScrollTrigger, Zoom } from "@mui/material";
import React from "react";

export default function ScrollTop() {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 1500,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    );

    if (anchor) {
      anchor.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  return (
    <Zoom in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        position={"fixed"}
        bottom={"1rem"}
        left={"1rem"}
      >
        <Fab
          size="small"
          aria-label="scroll back to top"
          variant={"circular"}
          sx={{
            backgroundColor: "primary.background",
            transition: "all 0.3s ease-in-out",
            "&:hover": {
              transform: "scale(1.1)",
              transition: "all 0.2s ease-in-out",
            },
            "&:active": {
              transform: "scale(0.9)",
              transition: "all 0.2s ease-in-out",
            },
          }}
        >
          <KeyboardArrowUpIcon
            fontSize="large"
            sx={{ color: "background.appBar" }}
          />
        </Fab>
      </Box>
    </Zoom>
  );
}
