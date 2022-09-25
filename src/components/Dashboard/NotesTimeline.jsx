import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToParentElement } from "@dnd-kit/modifiers";
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { Box, Grow, LinearProgress, Typography, Zoom } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import {
  getCategoryColorName,
  getCategoryName,
} from "../../helpers/notes/category";
import { getFilteredNotesCollection } from "../../helpers/notes/filter";
import {
  getOrderedNotesCollection,
  getUpdatedOrderedNotesID,
} from "../../helpers/notes/order";
import { NOTES_ORDER_BY } from "../../models/note-order";
import { spring } from "../../styles/animations/definitions";
import SortableNote from "./NotesTimeline/SortableNote";

export default function NotesTimeline({
  noteCollection,
  categoriesCollection,
  notesOrder,
  filterCategories,
  searchValue,
  noteStatus,
  setNoteCollection,
  setCategoriesCollection,
  setNotesOrder,
}) {
  //#region Hooks

  const [noNotesDisplayed, setNoNotesDisplayed] = useState(false);
  const [activeID, setActiveID] = useState(null); // activeID used to track the active note being dragged

  useEffect(() => {
    if (notesOrder.orderBy === NOTES_ORDER_BY.CUSTOM) {
      setNotesOrder((prev) => {
        return {
          ...prev,
          orderedNotesID: getUpdatedOrderedNotesID(
            prev.orderedNotesID,
            noteCollection
          ),
        };
      });
    }
  }, [noteCollection]);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 1, // Distance, in pixels, that the note must be dragged before it is considered active
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 100,
        tolerance: 5, // Distance, in pixels, of motion that is tolerated before the drag operation is aborted
      },
    })
  );

  //#endregion

  //#region Handlers
  // Sets the active note id when a note is being dragged
  const handleDragStart = (event) => {
    setActiveID(event.active.id);
  };

  // Swap the note indexes when a note is dropped after being dragged
  const handleDragEnd = ({ active, over }) => {
    // over is null when the note is dropped onto itself
    // Therefore, if over is null nothing needs to be done
    if (over && active.id !== over.id) {
      const oldIndex = active.data.current.sortable.index;
      const newIndex = over.data.current.sortable.index;

      setNotesOrder((prev) => {
        // Swap the ordered notes ID. If the ordered IDs array is empty, noteCollection will be used.
        const newNotesOrder = {
          orderedNotesID: arrayMove(
            prev.orderedNotesID.length > 0
              ? prev.orderedNotesID
              : noteCollection.map((note) => note.id),
            oldIndex,
            newIndex
          ),
          orderBy: NOTES_ORDER_BY.CUSTOM,
        };
        return newNotesOrder;
      });
    }
    setActiveID(null);
  };
  //#endregion

  // Store the ordered and filtered notes in a memoized variable
  // This avoids re-calculating the contents of the factory function on every re-render
  const memoizedNotesCollection = useMemo(() => {
    const orderedNotesCollection = getOrderedNotesCollection(
      noteCollection,
      categoriesCollection,
      notesOrder.orderedNotesID,
      notesOrder.orderBy
    );
    return getFilteredNotesCollection(
      orderedNotesCollection,
      categoriesCollection,
      searchValue,
      filterCategories
    );
  }, [
    noteCollection,
    categoriesCollection,
    notesOrder.orderedNotesID,
    notesOrder.orderBy,
    searchValue,
    filterCategories,
  ]);

  // If there are no searched categories, delay the display of the no categories message to avoid flicker
  if (memoizedNotesCollection.length === 0 && !noNotesDisplayed) {
    setTimeout(() => {
      setNoNotesDisplayed(true);
    }, 400);
  } else if (memoizedNotesCollection.length > 0 && noNotesDisplayed) {
    setNoNotesDisplayed(false);
  }

  const draggedNote = noteCollection.find((note) => note.id === activeID);
  const isFiltering = memoizedNotesCollection.length !== noteCollection.length;

  return noteStatus === "loading" ? (
    <Zoom in>
      <Box width={"100%"}>
        <LinearProgress />
      </Box>
    </Zoom>
  ) : noteCollection.length > 0 ? (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      autoScroll
      modifiers={[restrictToParentElement]}
    >
      <SortableContext
        items={memoizedNotesCollection}
        strategy={rectSortingStrategy}
      >
        <Box
          m={"1rem"}
          mb={"4rem"}
          p={["0.5rem", "1rem"]}
          display="grid"
          gap="2rem"
          gridTemplateColumns="repeat(auto-fill, minmax(20rem, 1fr))"
          justifyItems="center"
        >
          {/* AnimatePresence allows Components to animate out when they're removed from the React tree */}
          <AnimatePresence>
            {memoizedNotesCollection.map((note, index) => (
              <SortableNote
                key={note.id}
                noteID={note.id}
                isDraggingMode={!!activeID} // If activeID is set, a note is being dragged
                disableDrag={isFiltering}
                index={index}
                title={note.title}
                description={note.description}
                tags={note.tags}
                categoryName={getCategoryName(
                  note.category_id,
                  categoriesCollection
                )}
                categoryColor={getCategoryColorName(
                  note.category_id,
                  categoriesCollection
                )}
                searchValue={searchValue}
                noteCollection={noteCollection}
                categoriesCollection={categoriesCollection}
                setNoteCollection={setNoteCollection}
                setCategoriesCollection={setCategoriesCollection}
              />
            ))}
          </AnimatePresence>
        </Box>
        {/*  If filtered notes is 0, display no notes found message */}
        {noNotesDisplayed && (
          <motion.div layout transition={spring}>
            <Grow in>
              <Typography variant={"h5"} textAlign={"center"} mt={"2rem"}>
                No notes found...
              </Typography>
            </Grow>
          </motion.div>
        )}
      </SortableContext>
    </DndContext>
  ) : (
    // If no notes, display no notes message
    <motion.div layout transition={spring}>
      <Grow in>
        <Typography variant={"h5"} textAlign={"center"} mt={"2rem"}>
          No notes yet.
        </Typography>
      </Grow>
    </motion.div>
  );
}
