import React, { useState } from "react";
import { Grid, LinearProgress, Typography, Zoom } from "@mui/material";
import {
  closestCenter,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { Box } from "@mui/system";
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableNote } from "./Note/SortableNote";

export default function NotesTimeline({
  noteCollection,
  setNoteCollection,
  categories,
  searchValue,
  isGettingNotes,
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
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
    useSensor(TouchSensor)
  );

  // Sets the active note id when a note is being dragged
  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  // Swap the note indexes when a note is dropped after being dragged
  const handleDragEnd = (event) => {
    setActiveId(null);
    const { active, over } = event;

    if (active.id !== over.id) {
      setNoteCollection((noteCollection) => {
        const oldIndex = active.data.current.sortable.index;
        const newIndex = over.data.current.sortable.index;
        return arrayMove(noteCollection, oldIndex, newIndex);
      });
    }
  };

  return noteCollection.length > 0 ? (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
    >
      <SortableContext
        items={filteredNoteCollection}
        strategy={rectSortingStrategy}
      >
        <Grid container spacing={2} p={2} mt={"6em"}>
          {filteredNoteCollection.map((note, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              xl={2}
              sx={{ transition: "all 0.5s ease-in-out" }}
              key={note.id}
            >
              <SortableNote
                noteID={note.id}
                index={index}
                title={note.title}
                description={note.description}
                tags={note.tags}
                categoryName={note.category}
                color={
                  categories.find((category) => category.name === note.category)
                    ?.color
                }
                searchValue={searchValue}
                noteCollection={noteCollection}
                setNoteCollection={setNoteCollection}
              />
            </Grid>
          ))}
          {/*  If filtered notes is 0, display not found message */}
          {filteredNoteCollection.length === 0 && (
            <Grid item xs={12}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography variant="h6">No notes found 😭</Typography>
              </Box>
            </Grid>
          )}
        </Grid>
      </SortableContext>
    </DndContext>
  ) : isGettingNotes ? (
    // If getting notes, display progress bar
    <Zoom in>
      <Box sx={{ width: "100%" }}>
        <LinearProgress />
      </Box>
    </Zoom>
  ) : (
    // If no notes, display no notes message
    <Zoom in>
      <Typography
        variant={"h3"}
        sx={{
          position: "relative",
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
        }}
      >
        No notes yet.
      </Typography>
    </Zoom>
  );
}
