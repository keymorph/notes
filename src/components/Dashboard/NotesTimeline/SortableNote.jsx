import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { getBox } from "../../../helpers/sortable";
import Note from "./Note/Note";

export default function SortableNote({
  moveNote,
  setPosition,
  note, // Note object
  noteIdx,
  noteCollection,
  setNoteCollection,
  categories,
}) {
  const ref = useRef();
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    setPosition(noteIdx, getBox(ref.current));
  });

  const onTop = { zIndex: 1 };
  const flat = {
    zIndex: 0,
    transition: { delay: 0.5 },
  };

  return (
    <motion.div
      ref={ref}
      animate={dragging ? onTop : flat}
      drag
      dragSnapToOrigin
      onDragStart={() => setDragging(true)}
      onDragEnd={() => setDragging(false)}
      onDrag={(_, { point }) => moveNote(noteIdx, point)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 1.04 }}
      layout={!dragging}
      transition={{ type: "spring", bounce: 0.3, duration: 0.4 }}
      dragTransition={{ bounceStiffness: 200, bounceDamping: 25 }}
      // transition={}
    >
      <Note
        noteID={note.id}
        index={noteIdx}
        title={note.title}
        description={note.description}
        categoryName={note.category}
        tags={note.tags}
        color={
          categories.find((category) => category.name === note.category)?.color
        }
        noteCollection={noteCollection}
        setNoteCollection={setNoteCollection}
        categories={categories}
      />
    </motion.div>
  );
}
