import React from "react";
import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  IconButton,
  Menu,
  Typography,
} from "@mui/material";
import { DragHandle, MoreHoriz } from "@mui/icons-material";

export default function NoteSkeleton({ note, categories }) {
  const categoryExists = () => {
    return note.category !== "";
  };

  // Temporary solution to get the category color, will be replaced with a proper solution which might include
  // storing the colors in a more global context
  const categoryColorValue = (category) => {
    if (categoryExists()) {
      switch (categories.find((c) => c.name === category).color) {
        case "0": {
          // Grey
          return "#999999A0";
        }
        case "1": {
          // Red
          return "#af0500A0";
        }
        case "2": {
          // Yellow
          return "#da6e00A0";
        }
        case "3": {
          // Green
          return "#b2b100A0";
        }
        case "4": {
          // Blue
          return "#7789ABA0";
        }
        default: {
          return "#999999A0";
        }
      }
    } else {
      // There is no category, so return Grey
      return "#999999A0";
    }
  };

  return (
    <Card
      sx={{
        width: "300px",
        minHeight: "300px",
        maxHeight: "400px",
        overflowWrap: "break-word",
        margin: "5px",
      }}
    >
      <Box
        sx={{
          backgroundColor: categoryColorValue(note.category),
          display: "flex",
          position: "relative",
        }}
      >
        {categoryExists() ? (
          <Chip label={note.category} sx={{ m: 0.5, height: "2em" }} />
        ) : null}

        <Box
          aria-label="Drag note handle"
          sx={{
            position: "absolute",
            px: "4em",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            cursor: "move",
            opacity: "0.5",
          }}
        >
          <DragHandle />
        </Box>
        <IconButton
          aria-label="Note settings"
          sx={{ m: 0.5, ml: "auto", height: "1em" }}
        >
          <MoreHoriz />
        </IconButton>
      </Box>

      <Menu open={open} />

      <CardContent
        sx={{
          userSelect: "text",
          height: "100%",
          cursor: "pointer",
          py: 0.5,
          px: 1,
        }}
      >
        <Typography variant="body1" title="Title Name" noWrap>
          {note.title}
        </Typography>

        <Divider />

        <Typography variant="body2">{note.description}</Typography>
      </CardContent>
    </Card>
  );
}
