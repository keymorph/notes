import React, { useState } from "react";
import { Box, LinearProgress, Typography, Zoom } from "@mui/material";
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
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { SortableNote } from "./Note/SortableNote";
import NoteSkeleton from "./Note/NoteSkeleton";
import { restrictToParentElement } from "@dnd-kit/modifiers";

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
        <DragOverlay modifiers={[restrictToParentElement]}>
          {activeId ? (
            <NoteSkeleton
              note={noteCollection.find((note) => note.id === activeId)}
              categories={categories}
            />
          ) : null}
        </DragOverlay>
        {/* Resize items in grid if screen size is too small */}
        <Box
          sx={{
            p: 3,
            display: "grid",
            gap: "2em",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            justifyItems: "center",
          }}
        >
          {filteredNoteCollection.map((note, index) => (
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
              searchValue={searchValue}
              noteCollection={noteCollection}
              setNoteCollection={setNoteCollection}
            />
          ))}
        </Box>
        {/*  If filtered notes is 0, display no notes found message */}
        {filteredNoteCollection.length === 0 && (
          <Typography sx={{ width: "100%", textAlign: "center" }} variant="h5">
            No notes found
          </Typography>
        )}
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
