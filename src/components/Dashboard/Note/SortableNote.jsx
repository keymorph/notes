import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Note from "./Note";

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

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? "100" : "auto",
    opacity: isDragging ? 0.3 : 1,
  };

  return (
    <div id={props.noteID} ref={setNodeRef} style={style}>
      <Note
        dragHandleAttributes={attributes}
        dragHandleListeners={listeners}
        {...props}
      />
    </div>
  );
}
