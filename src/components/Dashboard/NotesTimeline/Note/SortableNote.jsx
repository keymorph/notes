import React from "react";
import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import Note from "./Note";
import {Box} from "@mui/material"; /*
  @description Wrapper component for note to make it draggable
*/

/*
  @description Wrapper component for note to make it draggable
*/
export function SortableNote(props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    transition: {
      duration: 250, // milliseconds
      easing: "cubic-bezier(0.25, 1, 0.5, 1)",
    },
    id: props.noteID,
  });

  return (
    <Box
      id={props.noteID}
      ref={setNodeRef}
      sx={{
        transformOrigin: "0 0",
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? "100" : "auto",
        opacity: isDragging ? 0.3 : 1,
      }}
    >
      <Note
        dragHandleAttributes={attributes}
        dragHandleListeners={listeners}
        {...props}
      />
    </Box>
  );
}
