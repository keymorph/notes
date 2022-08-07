import { useSortable } from "@dnd-kit/sortable";
import { useTheme } from "@mui/material";
import { motion } from "framer-motion";
import {
  spring,
  springNote,
  springNoteDrag,
  variantFadeStagger,
} from "../../../styles/animations/definitions";
import Note from "./Note";

/**
 * Wraps an item and makes it draggable in a sortable context
 *
 * @param {number} index - The index of the item in the array
 * @param {boolean} isDraggingMode - Whether any note in the notes is being dragged
 * @param {boolean} disableDrag - Whether the note should be draggable
 * @param rest - rest of the props for the item being wrapped
 * @returns {JSX.Element}
 */
export default function SortableNote({
  index,
  isDraggingMode,
  disableDrag,
  ...rest
}) {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useSortable({
      id: rest.noteID,
      disabled: disableDrag,
    });

  const dragShadow = isDragging
    ? isDarkMode
      ? "0rem 2rem 2rem rgba(0, 0, 0, 0.6)"
      : "0rem 2rem 2rem rgba(0, 0, 0, 0.3)"
    : "0rem 0rem 0rem rgba(0, 0, 0, 0)";

  return (
    <motion.div
      ref={setNodeRef}
      layout
      style={{
        transformOrigin: "0 0",
        zIndex: isDragging ? 1 : 0,
      }}
      animate={{
        scale: isDragging ? 1.04 : 1,
        x: transform?.x || 0,
        y: transform?.y || 0,
        boxShadow: dragShadow,
      }}
      transition={isDragging ? springNoteDrag : springNote}
    >
      <motion.div
        // layout={!isDraggingMode} // Only animate position changes when not dragging
        transition={spring}
        variants={variantFadeStagger}
        initial={"hidden"}
        animate={"visible"}
        exit={"hidden"}
        custom={index} // Passes parameters to functions inside of variants
      >
        <Note
          dragHandleAttributes={attributes}
          dragHandleListeners={listeners}
          isDragging={isDragging}
          disableDrag={disableDrag}
          {...rest}
        />
      </motion.div>
    </motion.div>
  );
}
