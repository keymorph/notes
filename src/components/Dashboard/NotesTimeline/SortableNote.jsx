import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { motion } from "framer-motion";
import Note from "./Note/Note";

export default function SortableNote(noteProps) {
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
    id: noteProps.noteID,
  });

  return (
    <motion.div
      // drag
      // dragSnapToOrigin
      // dragTransition={{ bounceStiffness: 200, bounceDamping: 25 }}
      // whileHover={{ scale: 1.02 }}
      // whileTap={{ scale: 1.04 }}
      layout={!noteProps.isDragging}
      transition={{ type: "spring", bounce: 0.3, duration: 0.75 }}
      ref={setNodeRef}
      style={{
        transformOrigin: "0 0",
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 1 : 0,
      }}
      variants={{
        hidden: { opacity: 0, transition: { duration: 0.15 } },
        visible: (i) => ({
          opacity: 1,
          transition: {
            delay: i * 0.05,
          },
        }),
      }}
      initial="hidden"
      animate="visible"
      exit="hidden"
      custom={noteProps.index} // Passes parameters to functions inside of variants
    >
      <Note
        dragHandleAttributes={attributes}
        dragHandleListeners={listeners}
        {...noteProps}
      />
    </motion.div>
  );
}
