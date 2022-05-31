import { Circle } from "@mui/icons-material";
import { Box, IconButton, Popper, useTheme } from "@mui/material";
import { useState } from "react";

export default function CategoryPalettePopper({
  open,
  anchorEl,
  setCategoryColor,
}) {
  const theme = useTheme();
  const [arrowRef, setArrowRef] = useState(null);

  const categoryColors = Object.keys(theme.palette.category);

  return (
    <Popper
      open={open}
      anchorEl={anchorEl}
      disablePortal={true}
      placement={"bottom"}
      modifiers={[
        {
          name: "preventOverflow",
          enabled: true,
          options: {
            altAxis: true,
            altBoundary: true,
            tether: false,
            rootBoundary: "document",
            padding: 8,
          },
        },
        {
          name: "arrow",
          enabled: true,
          options: {
            element: arrowRef,
          },
        },
      ]}
    >

      </Box>
    </Popper>
  );
}
