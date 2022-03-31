import React, { useState } from "react";
import Note from "./Note/Note";
import { Masonry } from "@mui/lab";
import { Grid, Typography } from "@mui/material";
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

  const [activeId, setActiveId] = useState(null);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
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
        <Grid container spacing={2}>
          {filteredNoteCollection.map((note, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={note.id}>
              <SortableNote
                key={note.id}
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
                noteCollection={noteCollection}
                setNoteCollection={setNoteCollection}
              />
            </Grid>
          ))}
        </Grid>
      </SortableContext>
    </DndContext>
  ) : (
    // If there are no notes, show a message.
    <Typography
      variant={"h3"}
      sx={{
        mt: "25vh",
        width: "100vw",
        textAlign: "center",
      }}
    >
      No notes yet.
    </Typography>
  );
}
