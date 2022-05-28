import { Box, LinearProgress, Typography, Zoom } from "@mui/material";
import React, { useState } from "react";
import SortableNotesContainer from "./SortableNotesContainer";

export default function NotesTimeline({
  noteCollection,
  setNoteCollection,
  categories,
  searchValue,
  noteStatus,
}) {
  // Filter notes by search value
  const filteredNoteCollection = noteCollection.filter((note) => {
    if (searchValue.trim() === "") {
      return true;
    } else {
      return (
        note.title.toLowerCase().includes(searchValue) ||
        note.description.toLowerCase().includes(searchValue) ||
        note.tags.includes(searchValue) ||
        note.category.toLowerCase().includes(searchValue)
      );
    }
  });

  // activeId used for overlay
  const [activeId, setActiveId] = useState(null);

  // Sets the active note id when a note is being dragged
  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  // Swap the note indexes when a note is dropped after being dragged
  const handleDragEnd = ({ active, over }) => {
    // over is null when the note is dropped onto itself
    // Therefore, if over is null nothing needs to be done
    if (over && active.id !== over.id) {
      setNoteCollection((noteCollection) => {
        const oldIndex = active.data.current.sortable.index;
        const newIndex = over.data.current.sortable.index;
        return arrayMove(noteCollection, oldIndex, newIndex);
      });
    }
    setActiveId(null);
  };

  if (noteStatus === "loading") {
    // If getting notes, display progress bar
    return (
      <Zoom in>
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      </Zoom>
    );
  } else {
    return noteCollection.length > 0 ? (
      <>
        <SortableNotesContainer
          noteCollection={filteredNoteCollection}
          setNoteCollection={setNoteCollection}
          categories={categories}
        />
        {/*  If filtered notes is 0, display no notes found message */}
        {filteredNoteCollection.length === 0 && (
          <Typography sx={{ width: "100%", textAlign: "center" }} variant="h5">
            No notes found
          </Typography>
        )}
      </>
    ) : (
      // If no notes, display no notes message
      <Zoom in>
        <Typography
          variant={"h3"}
          sx={{
            position: "relative",
            width: "100%",
            textAlign: "center",
            mt: "2.5em",
          }}
        >
          No notes yet.
        </Typography>
      </Zoom>
    );
  }
}
