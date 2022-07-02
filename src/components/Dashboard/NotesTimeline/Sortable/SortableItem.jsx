import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import {motion} from "framer-motion";
import {spring, variantFadeStagger,} from "../../../../styles/animations/definitions";
import Note from "../Note/Note";

/**
 * Wraps an item and makes it draggable in a sortable context
 *
 * @param {number} id - The id of the item
 * @param {number} index - The index of the item in the array
 * @param {boolean} isDraggingMode - Whether the context is in dragging mode (i.e. the user is dragging any item)
 * @param rest - rest of the props for the item being wrapped
 * @returns {JSX.Element}
 */
export default function SortableItem({ index, isDraggingMode, ...rest }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    transition: {
      duration: 250,
      easing: "ease-out",
    },
    id: rest.noteID,
  });

  return (
    <div
      ref={setNodeRef}
      style={{
        transformOrigin: "0 0",
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 1 : 0,
        userSelect: isDragging ? "none" : "auto", // Prevent user from selecting text while dragging
      }}
    >
      <motion.div
        layout={!isDraggingMode} // Only animate position changes when not dragging
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
          {...rest}
        />
      </motion.div>
    </div>
  );
}
